import {
  CdkOverlayOrigin,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { ItemDropdownController, ItemOverlayOpenChange } from './item-dropdown-controller';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ComponentPortal } from '@angular/cdk/portal';
import { ItemDropdownPanelComponent } from './item-dropdown-panel.component';
import { ComponentRef, ElementRef, TemplateRef } from '@angular/core';

const DEFAULT_CONFIG: ItemOverlayBuilderConfig = {
  panelClass: 'toolbar-item-dropdown-panel',
  detachOnEscKey: true,
  offsetX: 0,
  offsetY: 0,
  openOnCreate: false
};

export class ItemDropdownOverlayBuilder<T> {

  private _config: ItemOverlayBuilderConfig = DEFAULT_CONFIG;

  private _documentClickPath$: Observable<EventTarget[]> = fromEvent<MouseEvent>(document, 'click', {capture: true}).pipe(
    map((event: MouseEvent) => event.composedPath())
  );

  constructor(private _overlayService: Overlay) {
  }

  withConfig(config: ItemOverlayBuilderConfig): this {
    if (config) {
      this._config = {...this._config, ...config};
    }
    return this;
  }

  public buildAndConnect(cdkOverlayOrigin: CdkOverlayOrigin, overlayTemplate: TemplateRef<any>): ItemDropdownController<T> {
    const positionStrategy: FlexibleConnectedPositionStrategy = this._createPositionStrategy(cdkOverlayOrigin.elementRef);
    const overlayRef = this._createOverlay(positionStrategy);
    const openChange$ = merge(
      overlayRef.attachments().pipe(map(() => true)),
      overlayRef.detachments().pipe(map(() => false))).pipe(
      map((isAttached: boolean) => {
        return {
          isOpen: isAttached
        };
      })
    );
    this._registerOutsideClickListener(cdkOverlayOrigin.elementRef.nativeElement, overlayRef, openChange$);

    if (this._config.detachOnEscKey) {
      this._registerDetachOnEscKey(overlayRef);
    }

    const itemOverlayCtrl: ItemDropdownController<T> = {
      close: () => {
        if (overlayRef.hasAttached()) {
          overlayRef.detach();
        }
      },
      open: (itemData?: T) => {
        if (!overlayRef.hasAttached()) {
          this._showOverlay(overlayTemplate, overlayRef, itemData, itemOverlayCtrl, openChange$);
        }
      },
      toggle: (itemData?: T) => {
        if (overlayRef.hasAttached()) {
          overlayRef.detach();
        } else {
          this._showOverlay(overlayTemplate, overlayRef, itemData, itemOverlayCtrl, openChange$);
        }
      },
      openChange$,
      availableHeight$: new Subject<number>()
    };
    return itemOverlayCtrl;
  }

  private _registerDetachOnEscKey(overlayRef: OverlayRef): void {
    overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.keyCode === ESCAPE) {
        overlayRef.detach();
      }
    });
  }

  private _createPositionStrategy(originElementRef: ElementRef): FlexibleConnectedPositionStrategy {
    return this._overlayService
      .position()
      .flexibleConnectedTo(originElementRef)
      .withPositions(this._getPositionConfig())
      .withFlexibleDimensions(true)
      .withGrowAfterOpen(true)
      .withViewportMargin(24)
      .withDefaultOffsetX(this._config.offsetX)
      .withDefaultOffsetY(this._config.offsetY)
      .withPush(false);
  }

  private _registerOutsideClickListener(overlayOriginEl: HTMLElement,
                                        overlayRef: OverlayRef,
                                        openChange$: Observable<ItemOverlayOpenChange>): void {
    this._documentClickPath$.pipe(
      withLatestFrom(openChange$),
      filter(([eventPath, openChange]) => {
        return openChange.isOpen;
      }),
      map(([eventPath, openChange]) => eventPath),
      filter((eventPath: EventTarget[]) => {
        return !eventPath.includes(overlayRef.overlayElement) && !eventPath.includes(overlayOriginEl);
      })
    ).subscribe(() => {
      overlayRef.detach();
    });
  }

  private _showOverlay(overlayTemplate: TemplateRef<any>,
                       overlayRef: OverlayRef,
                       itemData: T,
                       itemOverlayCtrl: ItemDropdownController<T>,
                       openChange$: Observable<ItemOverlayOpenChange>): void {
    const overlayComponent: ItemDropdownPanelComponent<T> = this._createAndAttachOverlayComponentPortal(overlayRef);
    overlayComponent.panelTemplate = overlayTemplate;
    overlayComponent.itemDropdownController = itemOverlayCtrl;
    overlayComponent.itemData = itemData;
    overlayComponent.emitAvailableHeightOnResize = this._config.emitAvailableHeightOnResize;
  }

  private _createAndAttachOverlayComponentPortal(overlayRef: OverlayRef): ItemDropdownPanelComponent<T> {
    const overlayPortal: ComponentPortal<ItemDropdownPanelComponent<T>> =
      new ComponentPortal<ItemDropdownPanelComponent<T>>(ItemDropdownPanelComponent);
    const itemOverlayPanelComponentRef: ComponentRef<ItemDropdownPanelComponent<T>> =
      overlayRef.attach<ItemDropdownPanelComponent<T>>(overlayPortal);
    return itemOverlayPanelComponentRef.instance;
  }

  private _createOverlay(positionStrategy: PositionStrategy): OverlayRef {
    return this._overlayService.create({
      hasBackdrop: false,
      panelClass: this._config.panelClass,
      positionStrategy
    });
  }

  private _getPositionConfig(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        panelClass: 'item-dropdown-right-aligned'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        panelClass: 'item-dropdown-center-aligned'
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        panelClass: 'item-dropdown-left-aligned'
      }
    ];
  }
}

export interface ItemOverlayBuilderConfig {
  panelClass?: string;
  detachOnEscKey?: boolean;
  offsetX?: number;
  offsetY?: number;
  openOnCreate?: boolean;
  emitAvailableHeightOnResize?: boolean;
}


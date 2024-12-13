import {
  CdkOverlayOrigin,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { ItemDropdownController } from './item-dropdown-controller';
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

export class ItemDropdownOverlayBuilder<T, C> {

  private _config: ItemOverlayBuilderConfig = DEFAULT_CONFIG;

  private _documentClickPath$: Observable<EventTarget[]> = fromEvent<MouseEvent>(document, 'click', {capture: true}).pipe(
    map((event: MouseEvent) => event.composedPath())
  );

  constructor(private _overlayService: Overlay) {
  }

  public withConfig(config: ItemOverlayBuilderConfig): this {
    if (config) {
      this._config = {...this._config, ...config};
    }
    return this;
  }

  public buildAndConnect(cdkOverlayOrigin: CdkOverlayOrigin, overlayTemplate: TemplateRef<any>): ItemDropdownController<T, C> {
    const positionStrategy: FlexibleConnectedPositionStrategy = this._createPositionStrategy(cdkOverlayOrigin.elementRef);
    const overlayRef = this._createOverlay(positionStrategy);
    const dropdownOpen$ = merge(
      overlayRef.attachments().pipe(map(() => true)),
      overlayRef.detachments().pipe(map(() => false))
    );
    this._registerOutsideClickListener(cdkOverlayOrigin.elementRef.nativeElement, overlayRef, dropdownOpen$);

    if (this._config.detachOnEscKey) {
      this._registerDetachOnEscKey(overlayRef);
    }

    const itemOverlayCtrl: ItemDropdownController<T, C> = {
      close: () => {
        if (overlayRef.hasAttached()) {
          overlayRef.detach();
        }
      },
      open: (itemData?: T, itemConfig?: C) => {
        if (!overlayRef.hasAttached()) {
          this._showOverlay(overlayTemplate, overlayRef, itemData, itemConfig, itemOverlayCtrl, dropdownOpen$);
        }
      },
      toggle: (itemData?: T, itemConfig?: C) => {
        if (overlayRef.hasAttached()) {
          overlayRef.detach();
        } else {
          this._showOverlay(overlayTemplate, overlayRef, itemData, itemConfig, itemOverlayCtrl, dropdownOpen$);
        }
      },
      dropdownOpen$,
      availableHeight$: new Subject<number>()
    };
    return itemOverlayCtrl;
  }

  private _registerDetachOnEscKey(overlayRef: OverlayRef): void {
    overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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
                                        dropdownOpen$: Observable<boolean>): void {
    this._documentClickPath$.pipe(
      withLatestFrom(dropdownOpen$),
      filter(([eventPath, isOpen]) => {
        const dropdownOpen = isOpen && !eventPath.includes(overlayRef.overlayElement) && !eventPath.includes(overlayOriginEl);
        if (this._config.dropdownBypassElement) {
          return dropdownOpen && !eventPath.includes(this._config.dropdownBypassElement);
        } else {
          return dropdownOpen;
        }
      })
    ).subscribe(() => {
      overlayRef.detach();
    });
  }

  private _showOverlay(overlayTemplate: TemplateRef<any>,
                       overlayRef: OverlayRef,
                       itemData: T,
                       itemConfig: C,
                       itemOverlayCtrl: ItemDropdownController<T, C>,
                       dropdownOpen$: Observable<boolean>): void {
    const overlayComponent: ItemDropdownPanelComponent<T, C> = this._createAndAttachOverlayComponentPortal(overlayRef);
    overlayComponent.panelTemplate = overlayTemplate;
    overlayComponent.itemDropdownController = itemOverlayCtrl;
    overlayComponent.itemData = itemData;
    overlayComponent.itemConfig = itemConfig;
    overlayComponent.emitAvailableHeightOnResize = this._config.emitAvailableHeightOnResize;
  }

  private _createAndAttachOverlayComponentPortal(overlayRef: OverlayRef): ItemDropdownPanelComponent<T, C> {
    const overlayPortal: ComponentPortal<ItemDropdownPanelComponent<T, C>> =
      new ComponentPortal<ItemDropdownPanelComponent<T, C>>(ItemDropdownPanelComponent);
    const itemOverlayPanelComponentRef: ComponentRef<ItemDropdownPanelComponent<T, C>> =
      overlayRef.attach<ItemDropdownPanelComponent<T, C>>(overlayPortal);
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
        overlayX: 'center',
        overlayY: 'top',
        panelClass: 'item-dropdown-center-aligned'
      },
      {
        originX: 'start',
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
  dropdownBypassElement?: HTMLElement;
}

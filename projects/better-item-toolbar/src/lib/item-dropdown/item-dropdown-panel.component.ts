import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ItemDropdownController } from './item-dropdown-controller';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tfaster-item-dropdown-panel',
  templateUrl: './item-dropdown-panel.component.html',
  styleUrls: ['./item-dropdown-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDropdownPanelComponent<T, C> implements OnInit, AfterViewInit, OnDestroy {

  @Input() panelTemplate: TemplateRef<any>;
  @Input() itemDropdownController: ItemDropdownController<T, C>;
  @Input() itemData: T;
  @Input() itemConfig: C;
  @Input() emitAvailableHeightOnResize = false;

  public panelTemplateContext: any;

  private readonly _destroy$ = new Subject<void>();

  constructor(private  _elementRef: ElementRef) {
  }

  ngOnInit() {
    this.panelTemplateContext = {
      $implicit: this.itemData,
      itemConfig: this.itemConfig,
      dropdownController: this.itemDropdownController,
      availableHeight$: this.itemDropdownController.availableHeight$.asObservable()
    };
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this._updateAvailableHeight();
    }, 1);

    if (this.emitAvailableHeightOnResize) {
      fromEvent(window, 'resize').pipe(
        takeUntil(this._destroy$),
        debounceTime(20)
      ).subscribe(() => {
        this._updateAvailableHeight();
      });
    }

  }

  private _updateAvailableHeight(): void {
    const cdkOverlayBoundingBoxElement: HTMLElement = (this._elementRef.nativeElement as HTMLElement).parentElement.parentElement;
    this.itemDropdownController.availableHeight$.next(cdkOverlayBoundingBoxElement.offsetHeight);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}

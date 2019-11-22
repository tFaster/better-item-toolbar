import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ItemDropdownController } from './item-dropdown-controller';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { animate, group, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'tfaster-item-dropdown-panel',
  templateUrl: './item-dropdown-panel.component.html',
  styleUrls: ['./item-dropdown-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({transform: 'scale(1, 0.5)', top: '-50%', opacity: 0}),
            group([
              animate('80ms ease-out', style({transform: 'scale(1, 1)', top: 0})),
              animate('180ms ease-out', style({opacity: 1}))
            ])
          ]
        )
      ]
    )
  ]
})
export class ItemDropdownPanelComponent<T, C> implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('@.disabled')
  @Input()
  public animationsDisabled = false;

  @Input()
  public panelTemplate: TemplateRef<any>;

  @Input()
  public itemDropdownController: ItemDropdownController<T, C>;

  @Input()
  public itemData: T;

  @Input()
  public itemConfig: C;

  @Input()
  public emitAvailableHeightOnResize = false;

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

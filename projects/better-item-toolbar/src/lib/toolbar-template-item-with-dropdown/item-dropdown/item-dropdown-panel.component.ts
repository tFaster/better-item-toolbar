import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  input,
  Input,
  InputSignal,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ItemDropdownController } from './item-dropdown-controller';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { animate, group, style, transition, trigger } from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tfaster-item-dropdown-panel',
  templateUrl: './item-dropdown-panel.component.html',
  styleUrls: ['./item-dropdown-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet
  ],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({transform: 'scale(1, 0.5)', top: '-50%', opacity: 0}),
        group([
          animate('80ms ease-out', style({transform: 'scale(1, 1)', top: 0})),
          animate('180ms ease-out', style({opacity: 1}))
        ])
      ])
    ])
  ]
})
export class ItemDropdownPanelComponent<T, C> implements OnInit, AfterViewInit {
  private _elementRef = inject(ElementRef);
  @HostBinding('@.disabled')
  @Input()
  public animationsDisabled = false;

  public readonly panelTemplate: InputSignal<TemplateRef<any>> = input<TemplateRef<any>>();
  public readonly itemDropdownController: InputSignal<ItemDropdownController<T, C>> = input<ItemDropdownController<T, C>>();
  public readonly itemData: InputSignal<T> = input<T>();
  public readonly itemConfig: InputSignal<C> = input<C>();
  public readonly emitAvailableHeightOnResize: InputSignal<boolean> = input(false);

  public panelTemplateContext: any;

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit() {
    this.panelTemplateContext = {
      $implicit: this.itemData(),
      itemConfig: this.itemConfig(),
      dropdownController: this.itemDropdownController(),
      availableHeight$: this.itemDropdownController().availableHeight$.asObservable()
    };
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this._updateAvailableHeight();
    }, 1);

    if (this.emitAvailableHeightOnResize()) {
      fromEvent(window, 'resize').pipe(
        takeUntilDestroyed(this._destroyRef),
        debounceTime(20)
      ).subscribe(() => {
        this._updateAvailableHeight();
      });
    }

  }

  private _updateAvailableHeight(): void {
    const nativeElement: HTMLElement = this._elementRef.nativeElement as HTMLElement;
    if (nativeElement.parentElement && nativeElement.parentElement.parentElement) {
      const cdkOverlayBoundingBoxElement: HTMLElement = nativeElement.parentElement.parentElement;
      this.itemDropdownController().availableHeight$.next(cdkOverlayBoundingBoxElement.offsetHeight);
    }
  }

}

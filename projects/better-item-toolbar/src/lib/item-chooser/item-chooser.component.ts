import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  TemplateRef,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CdkMonitorFocus } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tfaster-item-chooser',
  standalone: true,
  templateUrl: './item-chooser.component.html',
  styleUrls: ['./item-chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgTemplateOutlet,
    CdkMonitorFocus
  ],
  animations: [
    trigger('showHide', [
      state('shown', style({
        width: '*',
        opacity: 1
      })),
      state('hidden', style({
        width: 0,
        opacity: 0
      })),
      transition('shown => hidden', [
        group([
          animate('100ms ease-out', style({width: 0})),
          animate('100ms ease-out', style({opacity: 0}))
        ])
      ]),
      transition('hidden => shown', [
        group([
          animate('100ms ease-out', style({width: '*'})),
          animate('100ms 100ms ease-out', style({opacity: 1}))
        ])
      ])
    ])
  ]
})
export class ItemChooserComponent {

  private _destroyRef$: DestroyRef = inject(DestroyRef);
  private _addButtonWrapperMouseEnter$: Subject<void> = new Subject<void>();
  private _itemChooserAddButton: Signal<ElementRef<HTMLButtonElement>> = viewChild<ElementRef<HTMLButtonElement> | undefined>('itemChooserAddButton');
  private _availableItemContainer: Signal<ElementRef<HTMLDivElement>> = viewChild<ElementRef<HTMLDivElement> | undefined>('availableItemContainer');

  public readonly items: InputSignal<ToolbarTemplateItem[]> = input<ToolbarTemplateItem[]>([]);
  public readonly itemChooserAddIconTemplate: InputSignal<TemplateRef<HTMLElement>> = input<TemplateRef<HTMLElement>>();
  public readonly closeAfterMouseLeaveTimeMs: InputSignal<number> = input<number>(1000);
  public readonly itemClick: OutputEmitterRef<ToolbarTemplateItem | ToolbarTemplateItemWithDropdown> = output();
  public readonly isShown: WritableSignal<boolean> = signal<boolean>(false);

  public onAddButtonKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.isShown.set(true);
      setTimeout(() => {
        (this._availableItemContainer()?.nativeElement.children[0] as HTMLElement).focus();
      }, 0);
    }
  }

  public onItemClick(item: ToolbarTemplateItem | ToolbarTemplateItemWithDropdown): void {
    this.itemClick.emit(item);
    this.isShown.set(false);
  }

  public closeChooserCallout(): void {
    this.isShown.set(false);
  }

  public onAddButtonWrapperMouseLeave(): void {
    timer(this.closeAfterMouseLeaveTimeMs()).pipe(
      takeUntilDestroyed(this._destroyRef$),
      takeUntil(this._addButtonWrapperMouseEnter$)
    ).subscribe(() => {
      this.isShown.set(false);
    });
  }

  public onAddButtonWrapperMouseEnter(): void {
    this._addButtonWrapperMouseEnter$.next();
  }

  public onAddButtonWrapperClick(): void {
    this.isShown.set(!this.isShown());
  }

  public onFocusOut(relatedTarget: HTMLElement): void {
    this.isShown.set(this._isFocusOnAddButtonOrInItemContainer(relatedTarget));
  }

  private _isFocusOnAddButtonOrInItemContainer(currentFocusedElement: HTMLElement): boolean {
    return currentFocusedElement
      && (currentFocusedElement.parentElement === this._availableItemContainer()?.nativeElement
        || currentFocusedElement === this._itemChooserAddButton()?.nativeElement);
  }
}

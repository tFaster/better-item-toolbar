import type { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tfaster-item-chooser',
  templateUrl: './item-chooser.component.html',
  styleUrls: ['./item-chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ItemChooserComponent implements OnInit, OnDestroy {

  @ViewChild('itemChooserAddButton')
  private _itemChooserAddButton: ElementRef<HTMLButtonElement> | undefined;

  @ViewChild('availableItemContainer')
  private _availableItemContainer: ElementRef<HTMLDivElement> | undefined;

  @Input()
  public items: ToolbarTemplateItem[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<HTMLElement> | undefined;

  @Input()
  public closeAfterMouseLeaveTimeMs = 1000;

  @Output()
  public itemClick = new EventEmitter<ToolbarTemplateItem | ToolbarTemplateItemWithDropdown>();

  public get isShown(): boolean {
    return this._isShown$.value;
  }

  private _addButtonKeydown$: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

  private _addButtonEnterOrSpaceKeydown$: Observable<KeyboardEvent> = this._addButtonKeydown$.pipe(
    filter((event: KeyboardEvent) => event.code === 'Enter' || event.code === 'Space')
  );

  private _isShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isShown$ = this._isShown$.asObservable();

  private readonly _destroy$ = new Subject<void>();

  private _addButtonWrapperMouseEnter$: Subject<void> = new Subject<void>();

  constructor(private _elementRef: ElementRef) {
  }

  public ngOnInit(): void {
    this._addButtonEnterOrSpaceKeydown$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this._isShown$.next(true);
      setTimeout(() => {
        (this._availableItemContainer?.nativeElement.children[0] as HTMLElement).focus();
      }, 0);
    });
  }

  public onAddButtonKeydown(event: KeyboardEvent): void {
    this._addButtonKeydown$.next(event);
  }

  public onItemClick(item: ToolbarTemplateItem | ToolbarTemplateItemWithDropdown): void {
    this.itemClick.emit(item);
    this._isShown$.next(false);
  }

  public closeChooserCallout(): void {
    this._isShown$.next(false);
  }

  public onAddButtonWrapperMouseLeave(): void {
    timer(this.closeAfterMouseLeaveTimeMs).pipe(
      takeUntil(this._destroy$),
      takeUntil(this._addButtonWrapperMouseEnter$)
    ).subscribe(() => {
      this._isShown$.next(false);
    });
  }

  public onAddButtonWrapperMouseEnter(): void {
    this._addButtonWrapperMouseEnter$.next();
  }

  public onAddButtonWrapperClick(): void {
    this._isShown$.next(!this._isShown$.value);

  }

  public onFocusOut(relatedTarget: HTMLElement): void {
    this._isShown$.next(this._isFocusOnAddButtonOrInItemContainer(relatedTarget));
  }

  private _isFocusOnAddButtonOrInItemContainer(currentFocusedElement: HTMLElement): boolean {
    return currentFocusedElement
      && (currentFocusedElement.parentElement === this._availableItemContainer?.nativeElement
        || currentFocusedElement === this._itemChooserAddButton?.nativeElement);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}

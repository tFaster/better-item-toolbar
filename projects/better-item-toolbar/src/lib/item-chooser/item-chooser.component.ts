import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

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
export class ItemChooserComponent implements OnInit {

  @ViewChild('itemChooserAddButton', {static: false})
  private _itemChooserAddButton;

  @ViewChild('availableItemContainer', {static: false})
  private _availableItemContainer;

  @Input()
  public items: ToolbarTemplateItem[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<HTMLElement>;

  @Output()
  public itemClick = new EventEmitter<ToolbarTemplateItem | ToolbarTemplateItemWithDropdown>();

  public isShown = false;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  isFocusOnAddButtonOrInItemContainer(currentFocusedElement: HTMLElement): boolean {
    return currentFocusedElement
      && (currentFocusedElement.parentElement === this._availableItemContainer.nativeElement
        || currentFocusedElement === this._itemChooserAddButton.nativeElement);
  }

  onAddButtonKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this.isShown = true;
      setTimeout(() => {
        (this._availableItemContainer.nativeElement.children[0] as HTMLElement).focus();
      }, 0);
    }
  }

  onItemClick(item: ToolbarTemplateItem | ToolbarTemplateItemWithDropdown): void {
    this.itemClick.emit(item);
    this.isShown = false;
  }

}

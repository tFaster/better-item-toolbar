import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToolbarItemDropdownConfig, ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'tfaster-item-toolbar',
  templateUrl: './item-toolbar.component.html',
  styleUrls: ['./item-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ width: 0, opacity: 0 }),
            group([
              animate('100ms ease-out', style({width: '*'})),
              animate('300ms ease-out', style({opacity: 1}))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({ width: '*', opacity: 1 }),
            group([
              animate('100ms ease-out', style({width: 0})),
              animate('100ms ease-out', style({opacity: 0}))
            ])
          ]
        )
      ]
    )
  ]
})
export class ItemToolbarComponent implements OnInit {

  @Input()
  public fixedItemsLeft: ToolbarTemplateItem[] = [];

  @Input()
  public addableItems: ToolbarTemplateItem[] = [];

  @Input()
  public fixedItemsRight: ToolbarTemplateItem[] = [];

  @Input()
  public fixedItemsOuterRight: ToolbarTemplateItem[] = [];


  @Input()
  public itemChooserAddIconTemplate: TemplateRef<any>;

  private _addedItems = new Set<ToolbarTemplateItem>();

  public get choosableItems(): ToolbarTemplateItem[] {
    return this.addableItems.filter((item: ToolbarTemplateItem) => this._isChoosableItem(item));
  }

  public get addedItems(): ToolbarTemplateItem[] {
    const items: ToolbarTemplateItem[] = Array.from(this._addedItems);
    items.sort((itemA: ToolbarTemplateItem, itemB: ToolbarTemplateItem) => {
      return itemA.order < itemB.order ? -1 : 1;
    });
    return items;
  }

  constructor() {
  }

  ngOnInit() {

  }

  public isItemWithDropdown(item: ToolbarTemplateItem): item is ToolbarTemplateItemWithDropdown {
    return 'dropdownConfig' in item;
  }

  public getDropdownConfig(item: ToolbarTemplateItemWithDropdown): ToolbarItemDropdownConfig {
    return item.dropdownConfig;
  }

  public addItem(item: ToolbarTemplateItemWithDropdown): void {
    this._addedItems.add(item);
  }

  public removeItem(item: ToolbarTemplateItem): void {
    this._addedItems.delete(item);
  }

  private _isChoosableItem(item): boolean {
    return !!item.itemChooserConfig && !Array.from(this._addedItems.values()).includes(item);
  }

}

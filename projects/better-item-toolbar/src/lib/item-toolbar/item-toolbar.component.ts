import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToolbarItemWithDropdown, ToolbarItemBase, ToolbarItemDropdownConfig } from '../toolbar-item-with-dropdown';

@Component({
  selector: 'tfaster-item-toolbar',
  templateUrl: './item-toolbar.component.html',
  styleUrls: ['./item-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemToolbarComponent implements OnInit {

  @Input()
  public items: ToolbarItemBase[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<any>;

  private _addedItems = new Set<ToolbarItemBase>();

  public get availableItems(): ToolbarItemBase[] {
    return this.items.filter((item: ToolbarItemBase) => !item.fixed && !Array.from(this._addedItems.values()).includes(item));
  }

  public get addedItems(): ToolbarItemBase[] {
    const fixedItems: ToolbarItemBase[] = this.items.filter((item: ToolbarItemBase) => !!item.fixed);
    const items: ToolbarItemBase[] = [...Array.from(this._addedItems), ...fixedItems];
    items.sort((itemA: ToolbarItemBase, itemB: ToolbarItemBase) => {
      return itemA.order < itemB.order ? -1 : 1;
    });
    return items;
  }

  constructor() {
  }

  ngOnInit() {

  }

  public isToolbarItem(item: ToolbarItemBase): item is ToolbarItemWithDropdown {
    return 'dropdownConfig' in item;
  }

  public getDropdownConfig(item: ToolbarItemWithDropdown): ToolbarItemDropdownConfig {
    return item.dropdownConfig;
  }

  public getItemTemplateContext(item: ToolbarItemBase) {
    return {
      $implicit: item.data,
      itemConfig: item.config
    };
  }

  public addItem(item: ToolbarItemWithDropdown): void {
    this._addedItems.add(item);
  }

  public removeItem(item: ToolbarItemBase): void {
    this._addedItems.delete(item);
  }


}

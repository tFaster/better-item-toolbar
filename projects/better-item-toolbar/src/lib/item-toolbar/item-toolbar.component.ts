import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToolbarItemDropdownConfig, ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';

@Component({
  selector: 'tfaster-item-toolbar',
  templateUrl: './item-toolbar.component.html',
  styleUrls: ['./item-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemToolbarComponent implements OnInit {

  @Input()
  public items: ToolbarTemplateItem[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<any>;

  private _addedItems = new Set<ToolbarTemplateItem>();

  public get choosableItems(): ToolbarTemplateItem[] {
    return this.items.filter((item: ToolbarTemplateItem) => this._isChoosableItem(item));
  }

  public get addedItems(): ToolbarTemplateItem[] {
    const fixedItems: ToolbarTemplateItem[] = this.items.filter((item: ToolbarTemplateItem) => !item.itemChooserConfig);
    const items: ToolbarTemplateItem[] = [...Array.from(this._addedItems), ...fixedItems];
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

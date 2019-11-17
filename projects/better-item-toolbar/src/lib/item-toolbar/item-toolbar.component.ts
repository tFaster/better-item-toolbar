import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToolbarItem } from '../toolbar-item';

@Component({
  selector: 'tfaster-item-toolbar',
  templateUrl: './item-toolbar.component.html',
  styleUrls: ['./item-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemToolbarComponent implements OnInit {

  @Input()
  public items: ToolbarItem[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<any>;

  private _addedItems = new Set<ToolbarItem>();

  public get availableItems(): ToolbarItem[] {
    return this.items.filter((item: ToolbarItem) => !item.fixed && !Array.from(this._addedItems.values()).includes(item));
  }

  public get addedItems(): ToolbarItem[] {
    const fixedItems: ToolbarItem[] = this.items.filter((item: ToolbarItem) => !!item.fixed);
    const items: ToolbarItem[] = [...Array.from(this._addedItems), ...fixedItems];
    items.sort((itemA: ToolbarItem, itemB: ToolbarItem) => {
      return itemA.order < itemB.order ? -1 : 1;
    });
    return items;
  }

  constructor() {
  }

  ngOnInit() {

  }

  public addItem(item: ToolbarItem): void {
    this._addedItems.add(item);
  }

  public removeItem(item: ToolbarItem): void {
    this._addedItems.delete(item);
  }


}

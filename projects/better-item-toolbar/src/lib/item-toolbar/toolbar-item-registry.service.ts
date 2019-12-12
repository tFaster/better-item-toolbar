import { Injectable } from '@angular/core';
import { ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';

@Injectable({
  providedIn: 'root'
})
export class ToolbarItemRegistryService {

  private _registeredItemControllers = new Map<ToolbarTemplateItemWithDropdown, ItemDropdownController<any, any>>();

  constructor() {
  }

  public registerItemController(item: ToolbarTemplateItemWithDropdown,
                                dropdownController: ItemDropdownController<any, any>) {
    this._registeredItemControllers.set(item, dropdownController);
  }

  public getDropdownController(item: ToolbarTemplateItemWithDropdown): ItemDropdownController<any, any> {
    return this._registeredItemControllers.get(item);
  }
}

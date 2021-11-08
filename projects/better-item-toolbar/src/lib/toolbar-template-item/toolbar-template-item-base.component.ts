import { EventEmitter, Input, Output, TemplateRef, Directive } from '@angular/core';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';

@Directive()
export abstract class ToolbarTemplateItemBaseComponent<T, C> {

  @Input()
  public itemTemplate: TemplateRef<any>;

  @Input()
  public itemData: T;

  @Input()
  public itemConfig: C;

  @Output()
  public removeClick = new EventEmitter<void>();

  public itemTemplateContext: { $implicit: T, itemConfig: C, removeClick: () => void, dropdownController?: ItemDropdownController<T, C> };

}

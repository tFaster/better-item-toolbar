import { TemplateRef, Directive, output, input, InputSignal, OutputEmitterRef } from '@angular/core';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';

@Directive()
export abstract class ToolbarTemplateItemBaseComponent<T, C> {
  public itemTemplate: InputSignal<TemplateRef<any>> = input<TemplateRef<any>>();
  public itemData: InputSignal<T> = input<T>();
  public itemConfig: InputSignal<C> = input<C>();
  public removeClick: OutputEmitterRef<void> = output<void>();
  public itemTemplateContext: { $implicit: T, itemConfig: C, removeClick: () => void, dropdownController?: ItemDropdownController<T, C> };
}

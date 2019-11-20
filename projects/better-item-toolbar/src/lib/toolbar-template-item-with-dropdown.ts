import { TemplateRef } from '@angular/core';
import { ItemOverlayBuilderConfig } from './toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-overlay-builder';

export interface ToolbarTemplateItem<T = any, C = any> {
  config?: C;
  data?: T;
  itemChooserConfig?: ItemChooserConfig;
  order?: number;
  template: TemplateRef<any>;
}

export interface ToolbarTemplateItemWithDropdown<T = any> extends ToolbarTemplateItem<T> {
  dropdownConfig?: ToolbarItemDropdownConfig;
}

export interface ToolbarItemDropdownConfig {
  overlayConfig?: ItemOverlayBuilderConfig;
  template?: TemplateRef<any>;
}

export interface ItemChooserConfig {
  label?: string;
  tooltip?: string;
  template: TemplateRef<any>;
  styleClass?: string;
}

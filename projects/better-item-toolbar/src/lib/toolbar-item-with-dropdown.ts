import { TemplateRef } from '@angular/core';
import { ItemOverlayBuilderConfig } from './toolbar-item-with-dropdown/item-dropdown/item-dropdown-overlay-builder';

export interface ToolbarItemBase<T = any, C = any> {
  itemTemplate: TemplateRef<any>;
  order?: number;
  fixed?: boolean;
  afterItemChooser?: boolean;
  itemChooserLabel?: string;
  itemChooserTemplate?: TemplateRef<any>;
  data?: T;
  config?: C;
}

export interface ToolbarItemWithDropdown<T = any> extends ToolbarItemBase<T> {
  dropdownConfig?: ToolbarItemDropdownConfig;
}

export interface ToolbarItemDropdownConfig {
  template?: TemplateRef<any>;
  overlayConfig?: ItemOverlayBuilderConfig;
}

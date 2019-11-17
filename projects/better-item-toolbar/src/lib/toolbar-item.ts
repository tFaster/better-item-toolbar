import { TemplateRef } from '@angular/core';
import { ItemOverlayBuilderConfig } from './item-dropdown/item-dropdown-overlay-builder';

export interface ToolbarItem<T = any> {
  typeLabel: string;
  itemTemplate: TemplateRef<any>;
  addItemTemplate?: TemplateRef<any>;
  dropdownConfig?: ToolbarItemDropdownConfig;
  order?: number;
  fixed?: boolean;
  data: T;
}

export interface ToolbarItemDropdownConfig {
  template?: TemplateRef<any>;
  overlayConfig?: ItemOverlayBuilderConfig;
}

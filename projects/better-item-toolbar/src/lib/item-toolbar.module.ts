import { NgModule } from '@angular/core';
import { ToolbarItemWithDropdownComponent } from './toolbar-item-with-dropdown/toolbar-item-with-dropdown.component';
import { ItemChooserComponent } from './item-chooser/item-chooser.component';
import { ItemToolbarComponent } from './item-toolbar/item-toolbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ItemDropdownPanelComponent } from './toolbar-item-with-dropdown/item-dropdown/item-dropdown-panel.component';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ItemToolbarComponent,
    ToolbarItemWithDropdownComponent,
    ItemChooserComponent,
    ItemDropdownPanelComponent
  ],
  imports: [
    A11yModule,
    BrowserAnimationsModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    ItemToolbarComponent,
    ToolbarItemWithDropdownComponent
  ],
  entryComponents: [
    ItemDropdownPanelComponent
  ]
})
export class ItemToolbarModule {
}

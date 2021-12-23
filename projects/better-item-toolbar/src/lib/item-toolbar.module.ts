import { NgModule } from '@angular/core';
import { ToolbarTemplateItemWithDropdownComponent } from './toolbar-template-item-with-dropdown/toolbar-template-item-with-dropdown.component';
import { ItemChooserComponent } from './item-chooser/item-chooser.component';
import { ItemToolbarComponent } from './item-toolbar/item-toolbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ItemDropdownPanelComponent } from './toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-panel.component';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarTemplateItemComponent } from './toolbar-template-item/toolbar-template-item.component';


@NgModule({
    declarations: [
        ItemToolbarComponent,
        ToolbarTemplateItemWithDropdownComponent,
        ItemChooserComponent,
        ItemDropdownPanelComponent,
        ToolbarTemplateItemComponent
    ],
    imports: [
        A11yModule,
        BrowserAnimationsModule,
        CommonModule,
        OverlayModule
    ],
    exports: [
        ItemToolbarComponent,
        ToolbarTemplateItemWithDropdownComponent
    ]
})
export class ItemToolbarModule {
}

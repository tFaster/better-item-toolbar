import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToolbarComponent } from './item-toolbar.component';
import { ToolbarTemplateItemWithDropdownComponent } from '../toolbar-template-item-with-dropdown/toolbar-template-item-with-dropdown.component';
import { ItemChooserComponent } from '../item-chooser/item-chooser.component';
import { ToolbarTemplateItemComponent } from '../toolbar-template-item/toolbar-template-item.component';

describe('ItemToolbarComponent', () => {
  let component: ItemToolbarComponent;
  let fixture: ComponentFixture<ItemToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemToolbarComponent,
        ToolbarTemplateItemComponent,
        ToolbarTemplateItemWithDropdownComponent,
        ItemChooserComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

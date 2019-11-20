import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToolbarComponent } from './item-toolbar.component';
import { ToolbarItemWithDropdownComponent } from '../toolbar-item-with-dropdown/toolbar-item-with-dropdown.component';
import { ItemChooserComponent } from '../item-chooser/item-chooser.component';

describe('ItemToolbarComponent', () => {
  let component: ItemToolbarComponent;
  let fixture: ComponentFixture<ItemToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemToolbarComponent,
        ToolbarItemWithDropdownComponent,
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

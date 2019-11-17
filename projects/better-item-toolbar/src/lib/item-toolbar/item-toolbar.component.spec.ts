import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemToolbarComponent } from './item-toolbar.component';
import { ToolbarItemComponent } from '../toolbar-item/toolbar-item.component';
import { ItemChooserComponent } from '../item-chooser/item-chooser.component';

describe('ItemToolbarComponent', () => {
  let component: ItemToolbarComponent;
  let fixture: ComponentFixture<ItemToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemToolbarComponent,
        ToolbarItemComponent,
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

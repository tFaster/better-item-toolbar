import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDropdownPanelComponent } from './item-dropdown-panel.component';
import { Subject } from 'rxjs';

describe('ItemDropdownPanelComponent', () => {
  let component: ItemDropdownPanelComponent<any, any>;
  let fixture: ComponentFixture<ItemDropdownPanelComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDropdownPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDropdownPanelComponent);
    component = fixture.componentInstance;
    component.itemDropdownController = {
      open: () => {
      },
      close: () => {
      },
      toggle: () => {
      },
      availableHeight$: new Subject<number>(),
      dropdownOpen$: new Subject<boolean>()
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

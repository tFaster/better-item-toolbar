import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarItemWithDropdownComponent } from './toolbar-item-with-dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ToolbarItemWithDropdownComponent', () => {
  let component: ToolbarItemWithDropdownComponent<any, any>;
  let fixture: ComponentFixture<ToolbarItemWithDropdownComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarItemWithDropdownComponent
      ],
      imports: [
        OverlayModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarItemWithDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

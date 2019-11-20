import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarTemplateItemWithDropdownComponent } from './toolbar-template-item-with-dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ToolbarTemplateItemWithDropdownComponent', () => {
  let component: ToolbarTemplateItemWithDropdownComponent<any, any>;
  let fixture: ComponentFixture<ToolbarTemplateItemWithDropdownComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarTemplateItemWithDropdownComponent
      ],
      imports: [
        OverlayModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarTemplateItemWithDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarItemComponent } from './toolbar-item.component';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ToolbarItemComponent', () => {
  let component: ToolbarItemComponent<any, any>;
  let fixture: ComponentFixture<ToolbarItemComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarItemComponent
      ],
      imports: [
        OverlayModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

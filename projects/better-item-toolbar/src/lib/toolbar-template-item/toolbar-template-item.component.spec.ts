import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarTemplateItemComponent } from './toolbar-template-item.component';

describe('ToolbarTemplateItemComponent', () => {
  let component: ToolbarTemplateItemComponent<any, any>;
  let fixture: ComponentFixture<ToolbarTemplateItemComponent<any, any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToolbarTemplateItemComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarTemplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeClick Output on removeClick call', (done) => {
    expect(component).toBeTruthy();
    component.removeClick.subscribe(() => {
      done();
    });
    component.itemTemplateContext.removeClick();
  });
});

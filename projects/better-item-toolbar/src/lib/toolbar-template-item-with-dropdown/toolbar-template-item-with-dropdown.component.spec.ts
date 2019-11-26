import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToolbarTemplateItemWithDropdownComponent } from './toolbar-template-item-with-dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create and call open on dropdown controller when openOnCreate is true',
    fakeAsync(() => {
      component.itemData = 'testItemData';
      component.itemConfig = 'testItemConfig';
      component.dropdownOverlayConfig = {
        openOnCreate: true
      };
      fixture.detectChanges();
      spyOn(component.itemTemplateContext.dropdownController, 'open');
      tick(200);
      expect(component.itemTemplateContext.dropdownController.open).toHaveBeenCalledWith('testItemData', 'testItemConfig');
    }));

  it('should call close() on dropdown controller and emit removeClick output on removeClick() call in template context', (done) => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    spyOn(component.itemTemplateContext.dropdownController, 'close');
    component.removeClick.subscribe(() => {
      done();
    });
    component.itemTemplateContext.removeClick();
    expect(component.itemTemplateContext.dropdownController.close).toHaveBeenCalled();
  });

  it('should toggle dropdown on ENTER key', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    spyOn(component.itemTemplateContext.dropdownController, 'toggle');
    const toolbarItem = fixture.debugElement.query(By.css('.toolbar-item'));
    toolbarItem.triggerEventHandler('keydown', {keyCode: ENTER});
    toolbarItem.triggerEventHandler('keydown', {keyCode: SPACE});
    expect(component.itemTemplateContext.dropdownController.toggle).toHaveBeenCalledTimes(2);
  });

  it('should open/close dropdown on DOWN_ARROW/UP_ARROW key', () => {
    expect(component).toBeTruthy();
    component.itemData = 'testItemData';
    component.itemConfig = 'testItemConfig';
    fixture.detectChanges();
    spyOn(component.itemTemplateContext.dropdownController, 'open');
    spyOn(component.itemTemplateContext.dropdownController, 'close');
    const toolbarItem = fixture.debugElement.query(By.css('.toolbar-item'));
    toolbarItem.triggerEventHandler('keydown', {keyCode: DOWN_ARROW});
    expect(component.itemTemplateContext.dropdownController.open).toHaveBeenCalledWith('testItemData', 'testItemConfig');
    toolbarItem.triggerEventHandler('keydown', {keyCode: UP_ARROW});
    expect(component.itemTemplateContext.dropdownController.close).toHaveBeenCalled();
  });

});

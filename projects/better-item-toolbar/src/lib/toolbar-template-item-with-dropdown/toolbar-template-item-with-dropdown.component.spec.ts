import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarTemplateItemWithDropdownComponent } from './toolbar-template-item-with-dropdown.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

describe('ToolbarTemplateItemWithDropdownComponent', () => {
  let componentRef: ComponentRef<ToolbarTemplateItemWithDropdownComponent<any, any>>;
  let component: ToolbarTemplateItemWithDropdownComponent<any, any>;
  let fixture: ComponentFixture<ToolbarTemplateItemWithDropdownComponent<any, any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToolbarTemplateItemWithDropdownComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarTemplateItemWithDropdownComponent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

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
    toolbarItem.triggerEventHandler('keydown', {code: 'Enter'});
    toolbarItem.triggerEventHandler('keydown', {code: 'Space'});
    expect(component.itemTemplateContext.dropdownController.toggle).toHaveBeenCalledTimes(2);
  });

  it('should open/close dropdown on DOWN_ARROW/UP_ARROW key', () => {
    expect(component).toBeTruthy();
    componentRef.setInput('itemData', 'testItemData');
    componentRef.setInput('itemConfig', 'testItemConfig');
    fixture.detectChanges();
    spyOn(component.itemTemplateContext.dropdownController, 'open');
    spyOn(component.itemTemplateContext.dropdownController, 'close');
    const toolbarItem = fixture.debugElement.query(By.css('.toolbar-item'));
    toolbarItem.triggerEventHandler('keydown', {code: 'ArrowDown'});
    expect(component.itemTemplateContext.dropdownController.open).toHaveBeenCalledWith('testItemData', 'testItemConfig');
    toolbarItem.triggerEventHandler('keydown', {code: 'ArrowUp'});
    expect(component.itemTemplateContext.dropdownController.close).toHaveBeenCalled();
  });

});

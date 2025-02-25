import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ItemChooserComponent } from './item-chooser.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarTemplateItem } from '../toolbar-template-item-with-dropdown';
import { ComponentRef } from '@angular/core';

describe('ItemChooserComponent', () => {
  let componentRef: ComponentRef<ItemChooserComponent>;
  let component: ItemChooserComponent;
  let fixture: ComponentFixture<ItemChooserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ItemChooserComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChooserComponent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
    componentRef.setInput('items', [
      {
        template: null,
        itemChooserConfig: {
          label: 'Test Item',
          template: null,
          styleClass: 'test-item-chooser-lime'
        }
      }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open on ENTER keydown', () => {
    expect(component.isShown()).toBeFalsy();
    triggerEventOnItemChooserAddButton('keydown', 'Enter');
    expect(component.isShown()).toBeTruthy();
  });

  it('should open on SPACE keydown', () => {
    expect(component.isShown()).toBeFalsy();
    triggerEventOnItemChooserAddButton('keydown', 'Space');
    expect(component.isShown()).toBeTruthy();
  });

  it('should close on ESC keydown', () => {
    expect(component.isShown()).toBeFalsy();
    triggerEventOnItemChooserAddButton('keydown', 'Space');
    expect(component.isShown()).toBeTruthy();
    const itemContainer = fixture.debugElement.query(By.css('.toolbar-item-chooser-item-container'));
    (itemContainer.nativeElement as HTMLElement)
      .dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', code: 'Escape'}));
    expect(component.isShown()).toBeFalsy();
  });

  it('should open on mouseenter and close on mouseleave', fakeAsync(() => {
    componentRef.setInput('closeAfterMouseLeaveTimeMs', 1);
    expect(component.isShown()).toBeFalsy();
    const wrapperEl = fixture.debugElement.query(By.css('.toolbar-item-chooser-wrapper'));
    wrapperEl.triggerEventHandler('click', {});
    expect(component.isShown()).toBeTruthy();
    wrapperEl.triggerEventHandler('mouseleave', {});
    tick(1);
    expect(component.isShown()).toBeFalsy();
  }));


  it('should close and emit item click on item click', (done) => {
    expect(component.isShown()).toBeFalsy();
    fixture.debugElement.query(By.css('.toolbar-item-chooser-wrapper'))
      .triggerEventHandler('click', {});
    expect(component.isShown()).toBeTruthy();

    component.itemClick.subscribe((item: ToolbarTemplateItem) => {
      expect(item.itemChooserConfig.label).toBe('Test Item');
      done();
    });
    fixture.debugElement.query(By.css('.toolbar-item-chooser-item'))
      .triggerEventHandler('click', {});
    expect(component.isShown()).toBeFalsy();

  });

  describe('on focus out', () => {
    it('should close if focus moved to an external element', () => {
      triggerEventOnItemChooserAddButton('keydown', 'Space');
      expect(component.isShown()).toBeTruthy();
      component.onFocusOut(document.body);
      expect(component.isShown()).toBeFalsy();
    });

    it('should not close if focus moved to an internal element', () => {
      triggerEventOnItemChooserAddButton('keydown', 'Space');
      expect(component.isShown()).toBeTruthy();
      const itemContainerButton = fixture.debugElement.query(By.css('.toolbar-item-chooser-item-container button'));
      component.onFocusOut(itemContainerButton.nativeElement);
      expect(component.isShown()).toBeTruthy();
    });
  });

  describe('mouse out', () => {
    it('should close when mouse moved out longer than timeout', fakeAsync(() => {
      componentRef.setInput('closeAfterMouseLeaveTimeMs', 1);
      triggerEventOnItemChooserAddButton('keydown', 'Space');
      expect(component.isShown()).toBeTruthy();
      component.onAddButtonWrapperMouseLeave();
      tick(2);
      expect(component.isShown()).toBeFalsy();
    }));

    it('should not close when mouse moved out shorter than timeout', fakeAsync(() => {
      componentRef.setInput('closeAfterMouseLeaveTimeMs', 2);
      triggerEventOnItemChooserAddButton('keydown', 'Space');
      expect(component.isShown()).toBeTruthy();
      component.onAddButtonWrapperMouseLeave();
      tick(1);
      component.onAddButtonWrapperMouseEnter();
      expect(component.isShown()).toBeTruthy();
    }));
  });

  function triggerEventOnItemChooserAddButton(eventName: 'keydown', code: string) {
    fixture.debugElement.query(By.css('.toolbar-item-chooser-add-button')).triggerEventHandler(eventName, {code});
  }

});



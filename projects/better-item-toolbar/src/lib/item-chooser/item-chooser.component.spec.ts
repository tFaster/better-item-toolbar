import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChooserComponent } from './item-chooser.component';
import { By } from '@angular/platform-browser';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarTemplateItem } from '../toolbar-template-item-with-dropdown';

describe('ItemChooserComponent', () => {
  let component: ItemChooserComponent;
  let fixture: ComponentFixture<ItemChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemChooserComponent
      ],
      imports: [
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChooserComponent);
    component = fixture.componentInstance;
    component.items = [
      {
        template: null,
        itemChooserConfig: {
          label: 'Test Item',
          template: null,
          styleClass: 'test-item-chooser-lime'
        }
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open on ENTER keydown', () => {
    expect(component.isShown).toBeFalsy();
    fixture.debugElement.query(By.css('.toolbar-item-chooser-add-button'))
      .triggerEventHandler('keydown', {keyCode: ENTER});
    expect(component.isShown).toBeTruthy();
  });

  it('should open on SPACE keydown', () => {
    expect(component.isShown).toBeFalsy();
    fixture.debugElement.query(By.css('.toolbar-item-chooser-add-button'))
      .triggerEventHandler('keydown', {keyCode: SPACE});
    expect(component.isShown).toBeTruthy();
  });

  it('should close on ESC keydown', () => {
    expect(component.isShown).toBeFalsy();
    fixture.debugElement.query(By.css('.toolbar-item-chooser-add-button'))
      .triggerEventHandler('keydown', {keyCode: SPACE});
    expect(component.isShown).toBeTruthy();
    const itemContainer = fixture.debugElement.query(By.css('.toolbar-item-chooser-item-container'));
    (itemContainer.nativeElement as HTMLElement)
      .dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', code: 'Escape'}));
    expect(component.isShown).toBeFalsy();
  });

  it('should open on mouseenter and close on mouseleave', () => {
    expect(component.isShown).toBeFalsy();
    const wrapperEl = fixture.debugElement.query(By.css('.toolbar-item-chooser-wrapper'));
    wrapperEl.triggerEventHandler('mouseenter', {});
    expect(component.isShown).toBeTruthy();
    wrapperEl.triggerEventHandler('mouseleave', {});
    expect(component.isShown).toBeFalsy();
  });


  it('should close and emit item click on item click', (done) => {
    expect(component.isShown).toBeFalsy();
    fixture.debugElement.query(By.css('.toolbar-item-chooser-wrapper'))
      .triggerEventHandler('mouseenter', {});
    expect(component.isShown).toBeTruthy();

    component.itemClick.subscribe((item: ToolbarTemplateItem) => {
      expect(item.itemChooserConfig.label).toBe('Test Item');
      done();
    });
    fixture.debugElement.query(By.css('.toolbar-item-chooser-item'))
      .triggerEventHandler('click', {});
    expect(component.isShown).toBeFalsy();

  });

  describe('isFocusOnAddButtonOrInItemContainer', () => {
    it('should be falsy when items outside the component are focused', () => {
      expect(component.isFocusOnAddButtonOrInItemContainer(undefined)).toBeFalsy();
      expect(component.isFocusOnAddButtonOrInItemContainer(document.body)).toBeFalsy();
    });

    it('should be truthy when items inside the component are focused', () => {
      const addButton = fixture.debugElement.query(By.css('.toolbar-item-chooser-add-button'));
      expect(component.isFocusOnAddButtonOrInItemContainer(addButton.nativeElement)).toBeTruthy();
      const item = fixture.debugElement.query(By.css('.toolbar-item-chooser-item'));
      expect(component.isFocusOnAddButtonOrInItemContainer(item.nativeElement)).toBeTruthy();
    });
  });
});

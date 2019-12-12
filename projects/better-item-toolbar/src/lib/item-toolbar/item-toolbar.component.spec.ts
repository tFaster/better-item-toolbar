import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ItemToolbarComponent } from './item-toolbar.component';
import { ToolbarTemplateItemWithDropdownComponent } from '../toolbar-template-item-with-dropdown/toolbar-template-item-with-dropdown.component';
import { ItemChooserComponent } from '../item-chooser/item-chooser.component';
import { ToolbarTemplateItemComponent } from '../toolbar-template-item/toolbar-template-item.component';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToolbarItemRegistryService } from './toolbar-item-registry.service';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';

const itemRegistry = new ToolbarItemRegistryService();

describe('ItemToolbarComponent', () => {
  let component: ItemToolbarComponent;
  let fixture: ComponentFixture<ItemToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TemplateTestComponent,
        ItemToolbarComponent,
        ToolbarTemplateItemComponent,
        ToolbarTemplateItemWithDropdownComponent,
        ItemChooserComponent
      ],
      imports: [
        NoopAnimationsModule,
        OverlayModule
      ],
      providers: [
        {provide: ToolbarItemRegistryService, useFactory: () => itemRegistry}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('with items', () => {
    let templateTestComponentFixture;
    let testToolbarItem: ToolbarTemplateItemWithDropdown;
    let testToolbarItem2: ToolbarTemplateItemWithDropdown;
    let testToolbarItem3: ToolbarTemplateItemWithDropdown;

    beforeEach(() => {
      templateTestComponentFixture = TestBed.createComponent(TemplateTestComponent);
      testToolbarItem = {
        template: templateTestComponentFixture.componentInstance.itemTemplate,
        dropdownConfig: {
          template: templateTestComponentFixture.componentInstance.itemDropdownTemplate
        },
        data: 'testItemWithNoOrder'
      };
      testToolbarItem2 = {
        template: templateTestComponentFixture.componentInstance.itemTemplate,
        dropdownConfig: {
          template: templateTestComponentFixture.componentInstance.itemDropdownTemplate
        },
        data: 'testItemWithOrderTwo',
        order: 2
      };
      testToolbarItem3 = {
        template: templateTestComponentFixture.componentInstance.itemTemplate,
        dropdownConfig: {
          template: templateTestComponentFixture.componentInstance.itemDropdownTemplate
        },
        data: 'testItemWithOrderZero',
        order: 0
      };
    });

    it('should render one fixed item left', () => {
      component.fixedItemsLeft = [testToolbarItem];
      fixture.detectChanges();
      const testItemsLeft = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsLeft.length).toBe(1);
      expect((testItemsLeft[0].nativeElement as HTMLElement).innerText).toBe('testItemWithNoOrder');
      expect(component.isItemWithDropdown(testToolbarItem)).toBeTruthy();
      expect(component.getDropdownConfig(testToolbarItem)).toBe(testToolbarItem.dropdownConfig);
    });

    it('should render two fixed item right to item chooser', () => {
      component.fixedItemsRight = [testToolbarItem, testToolbarItem2];
      fixture.detectChanges();
      const testItemsRight = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsRight.length).toBe(2);
    });

    it('should render two fixed items outer right', () => {
      component.fixedItemsOuterRight = [testToolbarItem, testToolbarItem2];
      fixture.detectChanges();
      const testItemsOuterRight = fixture.debugElement.queryAll(By.css('.item-toolbar-right .testItem'));
      expect(testItemsOuterRight.length).toBe(2);
    });

    it('should render item chooser when there are addable items', () => {
      component.addableItems = [testToolbarItem, testToolbarItem2];
      fixture.detectChanges();
      const testItemChooser = fixture.debugElement.query(By.css('tfaster-item-chooser'));
      expect(testItemChooser).toBeDefined();
    });

    it('should add not yet added items in correct order', () => {
      component.addableItems = [testToolbarItem, testToolbarItem2, testToolbarItem3];
      fixture.detectChanges();
      let testItemsLeft = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsLeft.length).toBe(0);
      component.addItem(testToolbarItem2);
      component.addItem(testToolbarItem);
      component.addItem(testToolbarItem3);
      fixture.detectChanges();
      testItemsLeft = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsLeft.length).toBe(3);
      expect((testItemsLeft[0].nativeElement as HTMLElement).innerText).toBe('testItemWithOrderZero');
      expect((testItemsLeft[1].nativeElement as HTMLElement).innerText).toBe('testItemWithOrderTwo');
      expect((testItemsLeft[2].nativeElement as HTMLElement).innerText).toBe('testItemWithNoOrder');
    });

    it('should remove added items', () => {
      component.addableItems = [testToolbarItem3, testToolbarItem, testToolbarItem2];
      component.addItem(testToolbarItem);
      component.addItem(testToolbarItem2);
      component.addItem(testToolbarItem3);
      fixture.detectChanges();
      component.removeItem(testToolbarItem);
      component.removeItem(testToolbarItem2);
      fixture.detectChanges();
      let testItemsLeft = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsLeft.length).toBe(1);
      component.removeItem(testToolbarItem3);
      fixture.detectChanges();
      testItemsLeft = fixture.debugElement.queryAll(By.css('.item-toolbar-left .testItem'));
      expect(testItemsLeft.length).toBe(0);
    });

    it('should add item and open dropdown if openOnCreate is true', fakeAsync(() => {
      component.addableItems = [testToolbarItem, testToolbarItem2, testToolbarItem3];
      fixture.detectChanges();
      component.addItem(testToolbarItem, true);
      fixture.detectChanges();
      const ctrl: ItemDropdownController<any, any> = itemRegistry.getDropdownController(testToolbarItem);
      spyOn(ctrl, 'open');
      tick(200);
      expect(ctrl.open).toHaveBeenCalledTimes(1);
    }));

  });
});


@Component({
  template: `
    <ng-template #itemTemplate let-itemData>
      <span class="testItem">{{itemData}}</span>
    </ng-template>
    <ng-template #itemDropdownTemplate>
      <span class="testItem">Item Dropdown Template Content</span>
    </ng-template>`
})
export class TemplateTestComponent {
  @ViewChild('itemTemplate', {static: true})
  itemTemplate: TemplateRef<any>;
  @ViewChild('itemDropdownTemplate', {static: true})
  itemDropdownTemplate: TemplateRef<any>;
}

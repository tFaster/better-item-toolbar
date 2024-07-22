import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDropdownService } from './item-dropdown.service';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './item-dropdown-overlay-builder';
import { Component, ComponentRef, TemplateRef, ViewChild } from '@angular/core';
import { ItemDropdownController } from './item-dropdown-controller';
import { ItemDropdownPanelComponent } from './item-dropdown-panel.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemOverlayBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemDropdownPanelComponent,
        OverlayTemplateTestComponent
      ],
      imports: [
        NoopAnimationsModule,
        OverlayModule
      ]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: ItemDropdownService = TestBed.get(ItemDropdownService);
    expect(service).toBeTruthy();
  });

  it('should create overlayBuilder', () => {
    const service: ItemDropdownService = TestBed.get(ItemDropdownService);
    const builder = service.overlayBuilder();
    expect(builder).toBeTruthy();
  });


  describe('overlayBuilder', () => {
    let builder: ItemDropdownOverlayBuilder<any, any>;
    let templateTestComponentRef: ComponentRef<OverlayTemplateTestComponent>;
    let fixture: ComponentFixture<OverlayTemplateTestComponent>;

    beforeEach(() => {
      const service: ItemDropdownService = TestBed.get(ItemDropdownService);
      builder = service.overlayBuilder();
      fixture = TestBed.createComponent(OverlayTemplateTestComponent);
      templateTestComponentRef = fixture.componentRef;
    });

    it('should build overlay and open and close using open() and close() in controller', () => {
      const overlayController: ItemDropdownController<any, any> = builder.withConfig({
        panelClass: 'test-overlay-panel'
      }).buildAndConnect(
        templateTestComponentRef.instance.originElement,
        templateTestComponentRef.instance.itemDropdownTemplate
      );
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
      overlayController.open();
      fixture.detectChanges();
      const testOverlayPanel = document.querySelector('.test-overlay-panel');
      expect(testOverlayPanel).not.toBeNull();
      overlayController.close();
      fixture.detectChanges();
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
    });

    it('should build overlay and open and close using toggle() in controller', () => {
      const overlayController: ItemDropdownController<any, any> = builder.withConfig({
        panelClass: 'test-overlay-panel'
      }).buildAndConnect(
        templateTestComponentRef.instance.originElement,
        templateTestComponentRef.instance.itemDropdownTemplate
      );
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
      overlayController.toggle();
      fixture.detectChanges();
      const testOverlayPanel = document.querySelector('.test-overlay-panel');
      expect(testOverlayPanel).not.toBeNull();
      overlayController.toggle();
      fixture.detectChanges();
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
    });

    it('should build overlay with config detachOnEscKey should close on ESC key', () => {
      const overlayController: ItemDropdownController<any, any> = builder.withConfig({
        detachOnEscKey: true,
        panelClass: 'test-overlay-panel'
      }).buildAndConnect(
        templateTestComponentRef.instance.originElement,
        templateTestComponentRef.instance.itemDropdownTemplate
      );
      overlayController.open();
      fixture.detectChanges();
      document.querySelector('body').dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', code: 'Escape'}));
      fixture.detectChanges();
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
    });

    it('should build overlay and close on body click', () => {
      const overlayController: ItemDropdownController<any, any> = builder.withConfig({
        panelClass: 'test-overlay-panel'
      }).buildAndConnect(
        templateTestComponentRef.instance.originElement,
        templateTestComponentRef.instance.itemDropdownTemplate
      );
      overlayController.open();
      fixture.detectChanges();
      document.querySelector('body').dispatchEvent(new KeyboardEvent('click', {}));
      fixture.detectChanges();
      expect(document.querySelector('.test-overlay-panel')).toBeNull();
    });

    it('should build overlay and not close on body click when body is bypass element', () => {
      const overlayController: ItemDropdownController<any, any> = builder.withConfig({
        panelClass: 'test-overlay-panel',
        dropdownBypassElement: document.body
      }).buildAndConnect(
        templateTestComponentRef.instance.originElement,
        templateTestComponentRef.instance.itemDropdownTemplate
      );
      overlayController.open();
      fixture.detectChanges();
      document.querySelector('body').dispatchEvent(new KeyboardEvent('click', {}));
      fixture.detectChanges();
      expect(document.querySelector('.test-overlay-panel')).not.toBeNull();
    });

  });
})
;


@Component({
  template: `
    <div cdkOverlayOrigin>ORIGIN</div>
    <ng-template #itemDropdownTemplate>
      <span class="testItem">Item Dropdown Template Content</span>
    </ng-template>`
})
export class OverlayTemplateTestComponent {
  @ViewChild(CdkOverlayOrigin, {static: true})
  originElement: CdkOverlayOrigin;
  @ViewChild('itemDropdownTemplate', {static: true})
  itemDropdownTemplate: TemplateRef<any>;
}


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDropdownPanelComponent } from './item-dropdown-panel.component';
import { Subject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentRef } from '@angular/core';

describe('ItemDropdownPanelComponent', () => {
  let componentRef: ComponentRef<ItemDropdownPanelComponent<any, any>>;
  let component: ItemDropdownPanelComponent<any, any>;
  let fixture: ComponentFixture<ItemDropdownPanelComponent<any, any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ItemDropdownPanelComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDropdownPanelComponent);
    componentRef = fixture.componentRef;
    component = fixture.componentInstance;
    componentRef.setInput('itemDropdownController', {
      open: () => {
      },
      close: () => {
      },
      toggle: () => {
      },
      availableHeight$: new Subject<number>(),
      dropdownOpen$: new Subject<boolean>()
    });
    componentRef.setInput('emitAvailableHeightOnResize', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update available height on window resize', (done) => {
    expect(component).toBeTruthy();
    fixture.whenRenderingDone().then(() => {
      setTimeout(() => { // wait until initial cal is over
        component.itemDropdownController().availableHeight$.subscribe(() => {
          done();
        });
        window.dispatchEvent(new Event('resize', {}));
      }, 1);

    });

  });
});

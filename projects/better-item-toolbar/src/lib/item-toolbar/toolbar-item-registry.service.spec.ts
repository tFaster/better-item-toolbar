import { TestBed } from '@angular/core/testing';

import { ToolbarItemRegistryService } from './toolbar-item-registry.service';
import { ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { Subject } from 'rxjs';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';

describe('ToolbarItemRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolbarItemRegistryService = TestBed.inject(ToolbarItemRegistryService);
    expect(service).toBeTruthy();
  });

  it('should register dropdown controller', () => {
    const service: ToolbarItemRegistryService = TestBed.inject(ToolbarItemRegistryService);

    const itemConfig: ToolbarTemplateItemWithDropdown = {
      config: {}, data: {}, dropdownConfig: {}, template: null
    };
    const controller: ItemDropdownController<any, any> = {
      open: (data, config) => {
      },
      close: () => {
      },
      toggle: () => {
      },
      dropdownOpen$: new Subject(),
      availableHeight$: new Subject<number>()
    };
    service.registerItemController(itemConfig, controller);
    expect(service.getDropdownController(itemConfig)).toEqual(controller);
  });
});

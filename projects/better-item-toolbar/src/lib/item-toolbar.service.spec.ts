import { TestBed } from '@angular/core/testing';

import { ItemToolbarService } from './item-toolbar.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ItemOverlayBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      OverlayModule
    ]
  }));

  it('should be created', () => {
    const service: ItemToolbarService = TestBed.get(ItemToolbarService);
    expect(service).toBeTruthy();
  });

  it('should create overlayBuilder', () => {
    const service: ItemToolbarService = TestBed.get(ItemToolbarService);
    const builder = service.overlayBuilder();
    expect(builder).toBeTruthy();
  });
});

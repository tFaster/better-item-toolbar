import { ItemDropdownOverlayBuilder } from './item-dropdown-overlay-builder';
import { OverlayConfig } from '@angular/cdk/overlay';

const overlayServiceStub: any = {
  create(config?: OverlayConfig): any {
    return {};
  }
};

describe('ItemOverlayBuilder', () => {
  it('should create an instance', () => {
    expect(new ItemDropdownOverlayBuilder(overlayServiceStub)).toBeTruthy();
  });
});

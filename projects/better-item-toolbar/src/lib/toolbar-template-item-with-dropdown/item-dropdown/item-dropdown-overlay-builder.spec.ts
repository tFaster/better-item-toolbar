import { getComposedEventPath, ItemDropdownOverlayBuilder } from './item-dropdown-overlay-builder';
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

describe('getComposedEventPath', () => {
  it('should get same composed event path as native composedPath() function', () => {
    const testBtnElement: HTMLButtonElement = document.createElement('button');
    document.body.append(testBtnElement);
    const testEvent: MouseEvent = new MouseEvent('click');

    testBtnElement.addEventListener('click', (mouseEvent: MouseEvent) => {
      const composedPath: EventTarget[] = getComposedEventPath(mouseEvent);
      const nativeComposedPath: EventTarget[] = mouseEvent.composedPath();
      expect(composedPath.length).toBe(nativeComposedPath.length);
      nativeComposedPath.forEach((el: EventTarget, index) => {
        expect(composedPath[index]).toBe(el);
      });
    });
    testBtnElement.dispatchEvent(testEvent);
  });
});

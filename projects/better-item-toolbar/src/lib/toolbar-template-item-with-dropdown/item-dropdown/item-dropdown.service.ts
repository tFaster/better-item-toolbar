import { inject, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './item-dropdown-overlay-builder';

@Injectable({
  providedIn: 'root'
})
export class ItemDropdownService {

  private _overlayService: Overlay = inject(Overlay);

  public overlayBuilder<T, C>(): ItemDropdownOverlayBuilder<T, C> {
    return new ItemDropdownOverlayBuilder<T, C>(this._overlayService);
  }

}

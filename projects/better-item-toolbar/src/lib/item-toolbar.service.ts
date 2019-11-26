import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-overlay-builder';

@Injectable({
  providedIn: 'root'
})
export class ItemToolbarService {


  constructor(private _overlayService: Overlay) {
  }

  overlayBuilder<T, C>(): ItemDropdownOverlayBuilder<T, C> {
    return new ItemDropdownOverlayBuilder(this._overlayService);
  }

}

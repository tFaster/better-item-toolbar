import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './item-dropdown-overlay-builder';

@Injectable({
  providedIn: 'root'
})
export class ItemDropdownService {


  constructor(private _overlayService: Overlay) {
  }

  overlayBuilder<T, C>(): ItemDropdownOverlayBuilder<T, C> {
    return new ItemDropdownOverlayBuilder<T, C>(this._overlayService);
  }

}

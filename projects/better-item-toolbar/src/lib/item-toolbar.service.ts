import { Injectable, OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './toolbar-item-with-dropdown/item-dropdown/item-dropdown-overlay-builder';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemToolbarService implements OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _overlayService: Overlay) {
  }

  overlayBuilder<T, C>(): ItemDropdownOverlayBuilder<T, C> {
    return new ItemDropdownOverlayBuilder(this._overlayService);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ItemDropdownOverlayBuilder } from './item-dropdown/item-dropdown-overlay-builder';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemToolbarService<T> implements OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _overlayService: Overlay) {
  }

  overlayBuilder(): ItemDropdownOverlayBuilder<T> {
    return new ItemDropdownOverlayBuilder(this._overlayService);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

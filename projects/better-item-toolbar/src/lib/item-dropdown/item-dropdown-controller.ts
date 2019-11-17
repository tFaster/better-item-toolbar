import { Observable, Subject } from 'rxjs';

export interface ItemDropdownController<T> {
  open: (data?: T) => void;
  close: () => void;
  toggle: (data?: T) => void;
  openChange$: Observable<ItemOverlayOpenChange>;
  availableHeight$: Subject<number>;
}

export interface ItemOverlayOpenChange {
  isOpen: boolean;
}

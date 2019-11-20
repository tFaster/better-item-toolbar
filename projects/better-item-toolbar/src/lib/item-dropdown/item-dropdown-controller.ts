import { Observable, Subject } from 'rxjs';

export interface ItemDropdownController<T, C> {
  open: (data?: T, config?: C) => void;
  close: () => void;
  toggle: (data?: T, config?: C) => void;
  openChange$: Observable<ItemOverlayOpenChange>;
  availableHeight$: Subject<number>;
}

export interface ItemOverlayOpenChange {
  isOpen: boolean;
}

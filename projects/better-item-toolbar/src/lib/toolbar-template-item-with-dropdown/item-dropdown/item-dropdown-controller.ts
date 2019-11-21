import { Observable, Subject } from 'rxjs';

export interface ItemDropdownController<T, C> {
  open: (data?: T, config?: C) => void;
  close: () => void;
  toggle: (data?: T, config?: C) => void;
  dropdownOpen$: Observable<boolean>;
  availableHeight$: Subject<number>;
}

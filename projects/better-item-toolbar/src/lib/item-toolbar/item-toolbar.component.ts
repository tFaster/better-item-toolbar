import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  TemplateRef,
  WritableSignal
} from '@angular/core';
import { ToolbarItemDropdownConfig, ToolbarTemplateItem, ToolbarTemplateItemWithDropdown } from '../toolbar-template-item-with-dropdown';
import { animate, group, style, transition, trigger } from '@angular/animations';
import { ItemDropdownController } from '../toolbar-template-item-with-dropdown/item-dropdown/item-dropdown-controller';
import { ToolbarItemRegistryService } from './toolbar-item-registry.service';
import { NgTemplateOutlet } from '@angular/common';
import { ItemChooserComponent } from '../item-chooser/item-chooser.component';
import {
  ToolbarTemplateItemWithDropdownComponent
} from '../toolbar-template-item-with-dropdown/toolbar-template-item-with-dropdown.component';
import { ToolbarTemplateItemComponent } from '../toolbar-template-item/toolbar-template-item.component';

@Component({
  selector: 'tfaster-item-toolbar',
  standalone: true,
  templateUrl: './item-toolbar.component.html',
  styleUrls: ['./item-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ItemChooserComponent,
    ToolbarTemplateItemWithDropdownComponent,
    ToolbarTemplateItemComponent
  ],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({width: 0, opacity: 0}),
            group([
              animate('100ms ease-out', style({width: '*'})),
              animate('300ms ease-out', style({opacity: 1}))
            ])
          ]
        ),
        transition(
          ':leave',
          [
            style({width: '*', opacity: 1}),
            group([
              animate('100ms ease-out', style({width: 0})),
              animate('100ms ease-out', style({opacity: 0}))
            ])
          ]
        )
      ]
    )
  ]
})
export class ItemToolbarComponent {

  private _toolbarItemRegistryService: ToolbarItemRegistryService = inject(ToolbarItemRegistryService);

  public readonly fixedItemsLeft: InputSignal<ToolbarTemplateItem[]> = input<ToolbarTemplateItem[]>([]);
  public readonly addableItems: InputSignal<ToolbarTemplateItem[]> = input<ToolbarTemplateItem[]>([]);
  public readonly fixedItemsRight: InputSignal<ToolbarTemplateItem[]> = input<ToolbarTemplateItem[]>([]);
  public readonly fixedItemsOuterRight: InputSignal<ToolbarTemplateItem[]> = input<ToolbarTemplateItem[]>([]);
  public readonly itemChooserAddIconTemplate: InputSignal<TemplateRef<any>> = input<TemplateRef<any>>();

  private _addedItemsSet: WritableSignal<Set<ToolbarTemplateItem>> = signal(new Set<ToolbarTemplateItem>());

  public readonly addedItems: Signal<ToolbarTemplateItem[]> = computed(() => {
    const items: ToolbarTemplateItem[] = Array.from(this._addedItemsSet());
    items.sort((itemA: ToolbarTemplateItem, itemB: ToolbarTemplateItem) => {
      if (typeof itemB.order === 'undefined') {
        return -1;
      } else if (typeof itemA.order === 'undefined') {
        return 1;
      }
      return itemA.order < itemB.order ? -1 : 1;
    });
    return items;
  });

  public readonly notYetAddedItems: Signal<ToolbarTemplateItem[]> = computed(() => {
    return this.addableItems().filter((item: ToolbarTemplateItem) => this._isNotYetAddedItem(item));
  });

  public isItemWithDropdown(item: ToolbarTemplateItem): item is ToolbarTemplateItemWithDropdown {
    return 'dropdownConfig' in item;
  }

  public getDropdownConfig(item: ToolbarTemplateItemWithDropdown): ToolbarItemDropdownConfig {
    return item.dropdownConfig;
  }

  public addItem(item: ToolbarTemplateItemWithDropdown, openOnCreate = false): void {
    const currentSet = this._addedItemsSet();
    if (!currentSet.has(item)) {
      currentSet.add(item);
      this._addedItemsSet.set(new Set(currentSet));
      if (openOnCreate) {
        setTimeout(() => {
          this._toolbarItemRegistryService.getDropdownController(item).open(item.data, item.config);
        }, 200);
      }
    }
  }

  public removeItem(item: ToolbarTemplateItem): void {
    const currentSet = this._addedItemsSet();
    if (currentSet.has(item)) {
      currentSet.delete(item);
      this._addedItemsSet.set(new Set(currentSet));
    }
  }

  public registerDropdownController(item: ToolbarTemplateItemWithDropdown,
                                    ctrl: ItemDropdownController<any, any>): void {
    this._toolbarItemRegistryService.registerItemController(item, ctrl);
  }

  private _isNotYetAddedItem(item: ToolbarTemplateItem): boolean {
    return !!item.itemChooserConfig && !Array.from(this._addedItemsSet().values()).includes(item);
  }
}

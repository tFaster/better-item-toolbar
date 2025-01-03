import { ChangeDetectionStrategy, Component, OnInit, Signal, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';
import { ToolbarTemplateItemWithDropdown } from '../../../better-item-toolbar/src/lib/toolbar-template-item-with-dropdown';
import { BehaviorSubject } from 'rxjs';
import { DemoListComponent, DemoListItem } from './demo-list/demo-list.component';
import { ItemToolbarComponent } from '@tfaster/better-item-toolbar';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { CdkMonitorFocus, CdkTrapFocus } from '@angular/cdk/a11y';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgClass,
    AsyncPipe,
    CdkMonitorFocus,
    NgStyle,
    DemoListComponent,
    CdkTrapFocus,
    ItemToolbarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private _betterItemToolbar: Signal<ItemToolbarComponent> = viewChild<ItemToolbarComponent>('betterItemToolbar');
  private _itemChooserItemTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('itemChooserItemTemplate');
  private _dropdownItemTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('dropdownItemTemplate');
  private _itemOnlyTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('itemOnlyTemplate');
  private _fixedDropdownItemTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('fixedDropdownItemTemplate');
  private _searchItemTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('searchItemTemplate');
  private _dropdownTemplateHeroes: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('dropdownTemplateHeroes');
  private _dropdownTemplateMovies: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('dropdownTemplateMovies');
  private _dropdownTemplateTime: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('dropdownTemplateTime');
  private _dropdownTemplateSearch: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('dropdownTemplateSearch');
  private _buttonsItemTemplate: Signal<TemplateRef<any>> = viewChild<TemplateRef<any>>('buttonsItemTemplate');

  public fixedItemsLeft: WritableSignal<ToolbarTemplateItemWithDropdown[]> = signal<ToolbarTemplateItemWithDropdown[]>([]);
  public addableItems: WritableSignal<ToolbarTemplateItemWithDropdown[]> = signal<ToolbarTemplateItemWithDropdown[]>([]);
  public fixedItemsRight: WritableSignal<ToolbarTemplateItemWithDropdown[]> = signal<ToolbarTemplateItemWithDropdown[]>([]);
  public fixedItemsOuterRight: WritableSignal<ToolbarTemplateItemWithDropdown[]> = signal<ToolbarTemplateItemWithDropdown[]>([]);

  public ngOnInit(): void {
    this.fixedItemsLeft.set([
      {
        template: this._fixedDropdownItemTemplate(),
        dropdownConfig: {
          template: this._dropdownTemplateHeroes(),
          overlayConfig: {
            offsetY: 4,
            emitAvailableHeightOnResize: true
          }
        },
        data: {
          selectedItem$: new BehaviorSubject<DemoListItem>({id: 'Robin', label: 'Robin'})
        },
        config: {
          colorClass: 'my-toolbar-item-amber',
          iconName: 'face'
        }
      }
    ]);

    this.addableItems.set([
      {
        template: this._dropdownItemTemplate(),
        dropdownConfig: {
          template: this._dropdownTemplateMovies(),
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        itemChooserConfig: {
          label: 'Movie',
          template: this._itemChooserItemTemplate(),
          styleClass: 'my-toolbar-item-chooser-lime'
        },
        config: {
          colorClass: 'my-toolbar-item-lime',
          iconName: 'movie'
        },
        order: 1
      },
      {
        template: this._dropdownItemTemplate(),
        dropdownConfig: {
          template: this._dropdownTemplateTime(),
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        itemChooserConfig: {
          label: 'Time',
          template: this._itemChooserItemTemplate(),
          styleClass: 'my-toolbar-item-chooser-green'
        },
        config: {
          colorClass: 'my-toolbar-item-green',
          iconName: 'access_time'
        },
        order: 2
      },
      {
        template: this._itemOnlyTemplate(),
        itemChooserConfig: {
          label: 'Fixed Time',
          template: this._itemChooserItemTemplate(),
          styleClass: 'my-toolbar-item-chooser-green'
        },
        data: {label: 'Fixed Time'},
        config: {
          colorClass: 'my-toolbar-item-green',
          iconName: 'access_time'
        },
        order: 3
      }
    ]);

    this.fixedItemsRight.set([
      {
        template: this._searchItemTemplate(),
        dropdownConfig: {
          template: this._dropdownTemplateSearch(),
          overlayConfig: {
            offsetY: 4
          }
        },
        data: {
          searchTerm$: new BehaviorSubject<string>('')
        },
        config: {
          colorClass: 'my-toolbar-item-cyan',
          iconName: 'search'
        }
      }
    ]);

    this.fixedItemsOuterRight.set([
      {
        template: this._buttonsItemTemplate()
      }
    ]);
  }

  addMovieItem(): void {
    this._betterItemToolbar().addItem(this.addableItems()[0]);
  }
}

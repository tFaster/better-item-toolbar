import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarTemplateItemWithDropdown } from '../../../better-item-toolbar/src/lib/toolbar-template-item-with-dropdown';
import { BehaviorSubject } from 'rxjs';
import { DemoListItem } from './demo-list/demo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @ViewChild('itemChooserItemTemplate', {static: true})
  itemChooserItemTemplate: TemplateRef<any>;

  @ViewChild('dropdownItemTemplate', {static: true})
  dropdownItemTemplate: TemplateRef<any>;

  @ViewChild('fixedDropdownItemTemplate', {static: true})
  fixedDropdownItemTemplate: TemplateRef<any>;

  @ViewChild('searchItemTemplate', {static: true})
  searchItemTemplate: TemplateRef<any>;

  @ViewChild('dropdownTemplateHeroes', {static: true})
  dropdownTemplateHeroes: TemplateRef<any>;

  @ViewChild('dropdownTemplateMovies', {static: true})
  dropdownTemplateMovies: TemplateRef<any>;

  @ViewChild('dropdownTemplateTime', {static: true})
  dropdownTemplateTime: TemplateRef<any>;

  @ViewChild('dropdownTemplateSearch', {static: true})
  dropdownTemplateSearch: TemplateRef<any>;

  @ViewChild('buttonsItemTemplate', {static: true})
  buttonsItemTemplate: TemplateRef<any>;

  public fixedItemsLeft: ToolbarTemplateItemWithDropdown[] = [];
  public addableItems: ToolbarTemplateItemWithDropdown[] = [];
  public fixedItemsRight: ToolbarTemplateItemWithDropdown[] = [];
  public fixedItemsOuterRight: ToolbarTemplateItemWithDropdown[] = [];

  public ngOnInit(): void {
    this.fixedItemsLeft = [
      {
        template: this.fixedDropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateHeroes,
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
    ];

    this.addableItems = [
      {
        template: this.dropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateMovies,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        itemChooserConfig: {
          label: 'Movie',
          template: this.itemChooserItemTemplate,
          styleClass: 'my-toolbar-item-chooser-lime'
        },
        config: {
          colorClass: 'my-toolbar-item-lime',
          iconName: 'movie'
        },
        order: 1
      },
      {
        template: this.dropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateTime,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        itemChooserConfig: {
          label: 'Time',
          template: this.itemChooserItemTemplate,
          styleClass: 'my-toolbar-item-chooser-green'
        },
        config: {
          colorClass: 'my-toolbar-item-green',
          iconName: 'access_time'
        },
        order: 2
      }
    ];

    this.fixedItemsRight = [
      {
        template: this.searchItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateSearch,
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
    ];

    this.fixedItemsOuterRight = [
      {
        template: this.buttonsItemTemplate
      }
    ];
  }
}

import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarItemWithDropdown } from '../../../better-item-toolbar/src/lib/toolbar-item-with-dropdown';
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

  @ViewChild('searchItemTemplate', {static: true})
  searchItemTemplate: TemplateRef<any>;

  @ViewChild('dropdownTemplateA', {static: true})
  dropdownTemplateA: TemplateRef<any>;

  @ViewChild('dropdownTemplateB', {static: true})
  dropdownTemplateB: TemplateRef<any>;

  @ViewChild('dropdownTemplateC', {static: true})
  dropdownTemplateC: TemplateRef<any>;

  @ViewChild('searchItemDropdownTemplate', {static: true})
  searchItemDropdownTemplate: TemplateRef<any>;

  @ViewChild('buttonsTemplate', {static: true})
  buttonsTemplate: TemplateRef<any>;

  public items: ToolbarItemWithDropdown[] = [];

  public ngOnInit(): void {
    this.items = [
      {
        itemChooserLabel: 'Hero',
        itemChooserTemplate: this.itemChooserItemTemplate,
        itemTemplate: this.dropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateA,
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
        },
        order: 1,
        fixed: false
      },
      {
        itemChooserLabel: 'Movie',
        itemChooserTemplate: this.itemChooserItemTemplate,
        itemTemplate: this.dropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateB,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        config: {
          colorClass: 'my-toolbar-item-lime',
          iconName: 'movie'
        },
        order: 2
      },
      {
        itemChooserLabel: 'Time',
        itemChooserTemplate: this.itemChooserItemTemplate,
        itemTemplate: this.dropdownItemTemplate,
        dropdownConfig: {
          template: this.dropdownTemplateC,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        config: {
          colorClass: 'my-toolbar-item-green',
          iconName: 'access_time',
        },
        order: 3
      },
      {
        itemChooserLabel: 'Search',
        itemChooserTemplate: this.itemChooserItemTemplate,
        itemTemplate: this.searchItemTemplate,
        dropdownConfig: {
          template: this.searchItemDropdownTemplate,
          overlayConfig: {
            offsetY: 4
          }
        },
        data: {
          searchTerm$: new BehaviorSubject<string>('')
        },
        config: {
          colorClass: 'my-toolbar-item-cyan',
          iconName: 'search',
        },
        order: 20,
        fixed: true,
        afterItemChooser: true
      },
      {
        itemTemplate: this.buttonsTemplate,
        fixed: true
      }
    ];
  }
}

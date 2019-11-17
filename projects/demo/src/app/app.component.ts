import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarItem } from '../../../better-item-toolbar/src/lib/toolbar-item';
import { BehaviorSubject } from 'rxjs';
import { DemoListItem } from './demo-list/demo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  @ViewChild('addItemTemplateB', {static: true})
  addItemTemplateB: TemplateRef<any>;

  @ViewChild('addItemTemplateC', {static: true})
  addItemTemplateC: TemplateRef<any>;

  @ViewChild('itemTemplateA', {static: true})
  itemTemplateA: TemplateRef<any>;

  @ViewChild('itemTemplateB', {static: true})
  itemTemplateB: TemplateRef<any>;

  @ViewChild('itemTemplateC', {static: true})
  itemTemplateC: TemplateRef<any>;

  @ViewChild('itemTemplateD', {static: true})
  itemTemplateD: TemplateRef<any>;

  @ViewChild('dropdownTemplateA', {static: true})
  dropdownTemplateA: TemplateRef<any>;

  @ViewChild('dropdownTemplateB', {static: true})
  dropdownTemplateB: TemplateRef<any>;

  @ViewChild('dropdownTemplateC', {static: true})
  dropdownTemplateC: TemplateRef<any>;

  @ViewChild('dropdownTemplateD', {static: true})
  dropdownTemplateD: TemplateRef<any>;

  public items: ToolbarItem[] = [];

  public ngOnInit(): void {
    this.items = [
      {
        typeLabel: 'Hero',
        itemTemplate: this.itemTemplateA,
        dropdownConfig: {
          template: this.dropdownTemplateA,
          overlayConfig: {
            offsetY: 4,
            emitAvailableHeightOnResize: true
          }
        },
        data: new BehaviorSubject<DemoListItem>({id: 'Robin', label: 'Robin'}),
        order: 1,
        fixed: true
      },
      {
        typeLabel: 'Movie',
        addItemTemplate: this.addItemTemplateB,
        itemTemplate: this.itemTemplateB,
        dropdownConfig: {
          template: this.dropdownTemplateB,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },
        data: {
          label: 'Movie'
        },
        order: 2
      },
      {
        typeLabel: 'Time',
        addItemTemplate: this.addItemTemplateC,
        itemTemplate: this.itemTemplateC,
        dropdownConfig: {
          template: this.dropdownTemplateC,
          overlayConfig: {
            offsetY: 4,
            openOnCreate: true
          }
        },

        data: {
          label: 'Time'
        },
        order: 3
      },
      {
        typeLabel: 'Search',
        itemTemplate: this.itemTemplateD,
        dropdownConfig: {
          template: this.dropdownTemplateD,
          overlayConfig: {
            offsetY: 4
          }
        },
        data: {
          searchTerm$: new BehaviorSubject<string>('')
        },
        order: 20,
        fixed: true
      }
    ];
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ToolbarItem } from '../toolbar-item';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'tfaster-item-chooser',
  templateUrl: './item-chooser.component.html',
  styleUrls: ['./item-chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showHide', [
      state('shown', style({
        width: '*',
        opacity: 1
      })),
      state('hidden', style({
        width: 0,
        opacity: 0
      })),
      transition('shown => hidden', [
        group([
          animate('100ms ease-out', style({width: 0})),
          animate('100ms ease-out', style({opacity: 0}))
        ])
      ]),
      transition('hidden => shown', [
        group([
          animate('100ms ease-out', style({width: '*'})),
          animate('100ms 100ms ease-out', style({opacity: 1}))
        ])
      ])
    ])
  ]
})
export class ItemChooserComponent implements OnInit {

  @Input()
  public items: ToolbarItem[] = [];

  @Input()
  public itemChooserAddIconTemplate: TemplateRef<HTMLElement>;

  @Output()
  public itemClick = new EventEmitter<ToolbarItem>();

  public isShown = false;

  constructor() {
  }

  ngOnInit() {
  }

  onItemClick(item: ToolbarItem): void {
    this.itemClick.emit(item);
    this.isShown = false;
  }

}

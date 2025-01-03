import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToolbarTemplateItemBaseComponent } from './toolbar-template-item-base.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'tfaster-toolbar-template-item',
  standalone: true,
  templateUrl: './toolbar-template-item.component.html',
  styleUrls: ['./toolbar-template-item.component.scss'],
  imports: [
    NgTemplateOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTemplateItemComponent<T, C> extends ToolbarTemplateItemBaseComponent<T, C> implements OnInit {

  public itemTemplateContext: { $implicit: T, itemConfig: C, removeClick: () => void };

  public ngOnInit(): void {
    this.itemTemplateContext = {
      $implicit: this.itemData(),
      itemConfig: this.itemConfig(),
      removeClick: () => {
        this.removeClick.emit();
      }
    };
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToolbarTemplateItemBaseComponent } from './toolbar-template-item-base.component';

@Component({
  selector: 'tfaster-toolbar-template-item',
  templateUrl: './toolbar-template-item.component.html',
  styleUrls: ['./toolbar-template-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTemplateItemComponent<T, C> extends ToolbarTemplateItemBaseComponent<T, C> implements OnInit {

  public itemTemplateContext: { $implicit: T, itemConfig: C, removeClick: () => void };

  public ngOnInit(): void {
    this.itemTemplateContext = {
      $implicit: this.itemData,
      itemConfig: this.itemConfig,
      removeClick: () => {
        this.removeClick.emit();
      }
    };
  }

}

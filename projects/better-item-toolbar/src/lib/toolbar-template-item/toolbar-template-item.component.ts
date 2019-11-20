import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToolbarTemplateItemBaseComponent } from './toolbar-template-item-base.component';

@Component({
  selector: 'tfaster-toolbar-template-item',
  templateUrl: './toolbar-template-item.component.html',
  styleUrls: ['./toolbar-template-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTemplateItemComponent<T, C> extends ToolbarTemplateItemBaseComponent<T, C> implements OnInit {

  ngOnInit() {
    super.itemTemplateContext = {
      $implicit: super.itemData,
      itemConfig: super.itemConfig,
      removeClick: () => {
        super.removeClick.emit();
      }
    };
  }

}

import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ItemToolbarService } from '../item-toolbar.service';
import { ItemDropdownController } from './item-dropdown/item-dropdown-controller';
import { ItemOverlayBuilderConfig } from './item-dropdown/item-dropdown-overlay-builder';
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { ToolbarTemplateItemBaseComponent } from '../toolbar-template-item/toolbar-template-item-base.component';

@Component({
  selector: 'tfaster-toolbar-item-with-dropdown',
  templateUrl: './toolbar-template-item-with-dropdown.component.html',
  styleUrls: ['./toolbar-template-item-with-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTemplateItemWithDropdownComponent<T, C> extends ToolbarTemplateItemBaseComponent<T, C> implements OnInit {

  @ViewChild(CdkOverlayOrigin, {static: true})
  private _itemDropdownOrigin: CdkOverlayOrigin;

  @Input()
  public dropdownTemplate: TemplateRef<any>;

  @Input()
  public dropdownOverlayConfig: ItemOverlayBuilderConfig;

  private _itemDropdownCtrl: ItemDropdownController<T, C>;

  constructor(private _itemToolbarService: ItemToolbarService) {
    super();
  }

  ngOnInit() {
    if (this._hasDropdown) {
      this._itemDropdownCtrl = this._itemToolbarService
        .overlayBuilder<T, C>()
        .withConfig(this.dropdownOverlayConfig)
        .buildAndConnect(this._itemDropdownOrigin, this.dropdownTemplate);
      this.itemTemplateContext = {
        $implicit: this.itemData,
        itemConfig: this.itemConfig,
        dropdownController: this._itemDropdownCtrl,
        removeClick: () => {
          this._itemDropdownCtrl.close();
          this.removeClick.emit();
        }
      };
      if (this.dropdownOverlayConfig.openOnCreate) {
        this._itemDropdownCtrl.open(this.itemData, this.itemConfig);
      }
    } else {
      this.itemTemplateContext = {
        $implicit: this.itemData,
        itemConfig: this.itemConfig,
        removeClick: () => {
          this.removeClick.emit();
        }
      };
    }
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case SPACE:
        this._itemDropdownCtrl.toggle(this.itemData, this.itemConfig);
        break;
      case UP_ARROW:
        this._itemDropdownCtrl.close();
        break;
      case DOWN_ARROW:
        this._itemDropdownCtrl.open(this.itemData, this.itemConfig);
        break;
    }
  }

  private get _hasDropdown(): boolean {
    return !!this.dropdownTemplate;
  }

}

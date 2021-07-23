import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ItemDropdownService } from './item-dropdown/item-dropdown.service';
import { ItemDropdownController } from './item-dropdown/item-dropdown-controller';
import { ItemOverlayBuilderConfig } from './item-dropdown/item-dropdown-overlay-builder';
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
  public dropdownOverlayConfig: ItemOverlayBuilderConfig = {};

  @Output()
  public dropdownControllerReady = new EventEmitter<ItemDropdownController<T, C>>();

  private _itemDropdownCtrl: ItemDropdownController<T, C>;

  constructor(private _itemToolbarService: ItemDropdownService) {
    super();
  }

  ngOnInit() {
    this._initDropdownController();
    this._initItemTemplateContext();
  }

  private _initDropdownController(): void {
    this._itemDropdownCtrl = this._itemToolbarService
      .overlayBuilder<T, C>()
      .withConfig(this.dropdownOverlayConfig)
      .buildAndConnect(this._itemDropdownOrigin, this.dropdownTemplate);
    this.dropdownControllerReady.emit(this._itemDropdownCtrl);
  }

  private _initItemTemplateContext(): void {
    this.itemTemplateContext = {
      $implicit: this.itemData,
      itemConfig: this.itemConfig,
      dropdownController: this._itemDropdownCtrl,
      removeClick: () => {
        this._itemDropdownCtrl.close();
        this.removeClick.emit();
      }
    };
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        this._itemDropdownCtrl.toggle(this.itemData, this.itemConfig);
        break;
      case 'ArrowUp':
        this._itemDropdownCtrl.close();
        break;
      case 'ArrowDown':
        this._itemDropdownCtrl.open(this.itemData, this.itemConfig);
        break;
    }
  }

}

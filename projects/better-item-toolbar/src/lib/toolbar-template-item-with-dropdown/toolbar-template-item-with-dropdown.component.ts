import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  TemplateRef,
  output,
  viewChild,
  input,
  Signal,
  InputSignal, OutputEmitterRef
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ItemDropdownService } from './item-dropdown/item-dropdown.service';
import { ItemDropdownController } from './item-dropdown/item-dropdown-controller';
import { ItemOverlayBuilderConfig } from './item-dropdown/item-dropdown-overlay-builder';
import { ToolbarTemplateItemBaseComponent } from '../toolbar-template-item/toolbar-template-item-base.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CdkMonitorFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'tfaster-toolbar-item-with-dropdown',
  standalone: true,
  templateUrl: './toolbar-template-item-with-dropdown.component.html',
  styleUrls: ['./toolbar-template-item-with-dropdown.component.scss'],
  imports: [
    NgClass,
    NgTemplateOutlet,
    CdkMonitorFocus,
    CdkOverlayOrigin
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTemplateItemWithDropdownComponent<T, C> extends ToolbarTemplateItemBaseComponent<T, C> implements OnInit {

  private _itemToolbarService: ItemDropdownService = inject(ItemDropdownService);
  private _itemDropdownOrigin: Signal<CdkOverlayOrigin> = viewChild(CdkOverlayOrigin);

  public readonly dropdownTemplate: InputSignal<TemplateRef<any>> = input<TemplateRef<any>>();
  public readonly dropdownOverlayConfig: InputSignal<ItemOverlayBuilderConfig> = input<ItemOverlayBuilderConfig>({});
  public readonly dropdownControllerReady: OutputEmitterRef<ItemDropdownController<T, C>> = output<ItemDropdownController<T, C>>();

  private _itemDropdownCtrl: ItemDropdownController<T, C>;

  public ngOnInit(): void {
    this._initDropdownController();
    this._initItemTemplateContext();
  }

  private _initDropdownController(): void {
    this._itemDropdownCtrl = this._itemToolbarService
      .overlayBuilder<T, C>()
      .withConfig(this.dropdownOverlayConfig())
      .buildAndConnect(this._itemDropdownOrigin(), this.dropdownTemplate());
    this.dropdownControllerReady.emit(this._itemDropdownCtrl);
  }

  private _initItemTemplateContext(): void {
    this.itemTemplateContext = {
      $implicit: this.itemData(),
      itemConfig: this.itemConfig(),
      dropdownController: this._itemDropdownCtrl,
      removeClick: () => {
        this._itemDropdownCtrl.close();
        this.removeClick.emit();
      }
    };
  }

  public onKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        this._itemDropdownCtrl.toggle(this.itemData(), this.itemConfig());
        break;
      case 'ArrowUp':
        this._itemDropdownCtrl.close();
        break;
      case 'ArrowDown':
        this._itemDropdownCtrl.open(this.itemData(), this.itemConfig());
        break;
    }
  }
}

import { EventEmitter, Input, Output, TemplateRef } from '@angular/core';

export abstract class ToolbarTemplateItemBaseComponent<T, C> {

  @Input()
  public itemTemplate: TemplateRef<any>;

  @Input()
  public itemData: T;

  @Input()
  public itemConfig: C;

  @Output()
  public removeClick = new EventEmitter<void>();

  public itemTemplateContext: any;

}

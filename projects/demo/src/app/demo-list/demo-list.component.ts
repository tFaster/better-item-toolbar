import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnChanges,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  SimpleChanges,
  viewChild,
  WritableSignal
} from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';

export interface DemoListItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss'],
  imports: [
    NgClass,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoListComponent implements OnInit, OnChanges {

  private _elementRef: ElementRef<any> = inject(ElementRef);
  private _virtualScrollViewport: Signal<CdkVirtualScrollViewport> = viewChild<CdkVirtualScrollViewport>('virtualScrollViewport');
  public readonly height: InputSignal<number> = input<number>();
  public readonly selectedItem: ModelSignal<DemoListItem> = model<DemoListItem>();
  public readonly selectedItemChange: OutputEmitterRef<DemoListItem> = output<DemoListItem>();

  public items: WritableSignal<DemoListItem[]> = signal<DemoListItem[]>([]);

  public readonly itemSize: WritableSignal<number> = signal<number>(27);

  public ngOnInit(): void {
    const heroList = [
      'Batman', 'Robin', 'Joker', 'Catwoman', 'Wonder Woman', 'Shazam', 'Superman', 'Green Lantern', 'Aquaman', 'Bane', 'Riddler',
      'Penguin', 'Scarecrow', 'The Flash', 'Two-Face', 'Poison Ivy'
    ];
    heroList.sort();
    const newItems: DemoListItem[] = heroList.map((hero) => {
      const demoListItem: DemoListItem = {
        id: hero,
        label: hero
      };
      return demoListItem;
    });
    this.items.set(newItems);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.height && changes.height.currentValue > 0) {
      const totalHeight = this.itemSize() * this.items().length;
      const height = Math.min(totalHeight, changes.height.currentValue - 1);
      (this._elementRef.nativeElement as HTMLElement).style.height = height + 'px';
      this._virtualScrollViewport().checkViewportSize();
    }
  }

  onItemClick(item: DemoListItem): void {
    this.selectedItem.set(item);
    this.selectedItemChange.emit(this.selectedItem());
  }
}

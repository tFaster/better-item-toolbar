import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';

export interface DemoListItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-demo-list',
  standalone: true,
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

  @ViewChild('virtualScrollViewport', {static: true})
  private _virtualScrollViewport: CdkVirtualScrollViewport;

  @Input()
  height: number;

  @Input()
  selectedItem: DemoListItem;

  @Output()
  selectedItemChange = new EventEmitter<DemoListItem>();

  items: DemoListItem[];

  readonly itemSize: number = 27;

  constructor(private _elementRef: ElementRef) {

  }

  ngOnInit() {
    const heroList = [
      'Batman', 'Robin', 'Joker', 'Catwoman', 'Wonder Woman', 'Shazam', 'Superman', 'Green Lantern', 'Aquaman', 'Bane', 'Riddler',
      'Penguin', 'Scarecrow', 'The Flash', 'Two-Face', 'Poison Ivy'
    ];
    heroList.sort();
    this.items = heroList.map((hero) => {
      const demoListItem: DemoListItem = {
        id: hero,
        label: hero
      };
      return demoListItem;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem) {
      this.selectedItem = changes.selectedItem.currentValue;
    }
    if (changes.height && changes.height.currentValue > 0) {
      const totalHeight = this.itemSize * this.items.length;
      const height = Math.min(totalHeight, changes.height.currentValue - 1);
      (this._elementRef.nativeElement as HTMLElement).style.height = height + 'px';
      this._virtualScrollViewport.checkViewportSize();
    }
  }

  onItemClick(item: DemoListItem): void {
    this.selectedItem = item;
    this.selectedItemChange.emit(this.selectedItem);
  }

}

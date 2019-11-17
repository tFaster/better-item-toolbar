import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChooserComponent } from './item-chooser.component';

describe('ItemChooserComponent', () => {
  let component: ItemChooserComponent;
  let fixture: ComponentFixture<ItemChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

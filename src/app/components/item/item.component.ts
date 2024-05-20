import { Component, Input } from '@angular/core';
import { ItemPropertyComponent } from '@/components/item-property/item-property.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { Item, Property } from '@/models/data.model';
import { Store } from '@ngrx/store';
import { ItemState } from '@/store/item/item.reducer';
import { undoChanges } from '@/store/item/item.actions';

@Component({
  selector: 'fts-item',
  standalone: true,
  imports: [ItemPropertyComponent, NgClass, NgFor, NgIf],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() isActive: boolean = false;
  @Input() item!: Item;

  @Output() clickItemEvent = new EventEmitter<number>();

  constructor(private store: Store<ItemState>) {}
  clickItem(itemId: number) {
    this.clickItemEvent.emit(itemId);
  }

  undoChanges() {
    this.store.dispatch(undoChanges({ itemId: this.item.originItem.itemId }));
  }
}

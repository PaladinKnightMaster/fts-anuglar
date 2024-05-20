import { Component, Input } from '@angular/core';
import { ItemPropertyComponent } from '@/components/item-property/item-property.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { Item, Property } from '@/models/data.model';
import { Store } from '@ngrx/store';
import { ItemState } from '@/store/item/item.reducer';
import { undoChanges } from '@/store/item/item.actions';

/**
 * The `ItemComponent` is a standalone Angular component that represents a single item in the application.
 * It imports and uses the `ItemPropertyComponent`, `NgClass`, `NgFor`, and `NgIf` directives.
 * The component is defined with the `fts-item` selector and uses the `item.component.html` template and `item.component.css` styles.
 */
@Component({
  selector: 'fts-item',
  standalone: true,
  imports: [ItemPropertyComponent, NgClass, NgFor, NgIf],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
/**
 * Represents a component that displays an individual item.
 *
 * This component is responsible for rendering an item and handling user interactions with it, such as clicking on the item.
 *
 * @param isActive - A boolean indicating whether the item is currently active.
 * @param item - The item to be displayed.
 * @param clickItemEvent - An event emitter that is triggered when the item is clicked.
 */
export class ItemComponent {
  @Input() isActive: boolean = false;
  @Input() item!: Item;

  @Output() clickItemEvent = new EventEmitter<number>();

  constructor(private store: Store<ItemState>) {}
  /**
   * Emits the ID of the clicked item.
   *
   * @param itemId - The ID of the item that was clicked.
   * @emits clickItemEvent - Emits the ID of the clicked item.
   */
  clickItem(itemId: number) {
    this.clickItemEvent.emit(itemId);
  }

  /**
   * Undoes any changes made to the item.
   */
  undoChanges() {
    this.store.dispatch(undoChanges({ itemId: this.item.originItem.itemId }));
  }
}

import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '@/components/item/item.component';
import { Item } from '@/models/data.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectItem, selectItems } from '@/store/item/item.selectors';
import { setSelectedItem } from '@/store/item/item.actions';
import { ItemState } from '@/store/item/item.reducer';

/**
 * The `ItemListComponent` is a standalone Angular component that displays a list of `ItemComponent` instances.
 * It uses the `NgFor` and `NgIf` directives, as well as the `AsyncPipe`, to render the list of items.
 * The component is defined with the `@Component` decorator, which specifies the component's selector, template, and styles.
 */
@Component({
  selector: 'fts-item-list',
  standalone: true,
  imports: [ItemComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
/**
 * The `ItemListComponent` is responsible for displaying a list of items and allowing the user to select an item.
 *
 * It subscribes to the `items$` observable to get the list of items, and the `selectedItem$` observable to get the currently selected item.
 *
 * The `selectItem()` method dispatches an action to the store to set the selected item.
 */
export class ItemListComponent {
  selectedItem$: Observable<number>;
  items$: Observable<Item[]>;

  /**
   * Dispatches an action to set the selected item in the store.
   *
   * @param itemId - The ID of the item to be selected.
   */
  selectItem(itemId: number) {
    this.store.dispatch(setSelectedItem({ selectedItem: itemId }));
  }

  constructor(private store: Store<ItemState>) {
    this.items$ = this.store.pipe(select(selectItems));
    this.selectedItem$ = this.store.pipe(select(selectItem));
  }
}

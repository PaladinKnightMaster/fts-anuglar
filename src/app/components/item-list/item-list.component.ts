import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '@/components/item/item.component';
import { Item } from '@/models/data.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectItem, selectItems } from '@/store/item/item.selectors';
import { setSelectedItem } from '@/store/item/item.actions';
import { ItemState } from '@/store/item/item.reducer';

@Component({
  selector: 'fts-item-list',
  standalone: true,
  imports: [ItemComponent, NgFor, NgIf, AsyncPipe],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  selectedItem$: Observable<number>;
  items$: Observable<Item[]>;

  selectItem(itemId: number) {
    this.store.dispatch(setSelectedItem({ selectedItem: itemId }));
  }

  constructor(private store: Store<ItemState>) {
    this.items$ = this.store.pipe(select(selectItems));
    this.selectedItem$ = this.store.pipe(select(selectItem));
  }
}

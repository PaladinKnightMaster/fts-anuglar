import { Component, Input } from '@angular/core';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ItemState } from '@/store/item/item.reducer';
import { updatePrice } from '@/store/item/item.actions';
import { Property } from '@/models/data.model';

@Component({
  selector: 'fts-item-property',
  standalone: true,
  imports: [CurrencyInputComponent, DecimalPipe],
  templateUrl: './item-property.component.html',
  styleUrl: './item-property.component.css',
})
export class ItemPropertyComponent {
  @Input() itemId: number = 0;
  @Input() property!: Property;

  constructor(private store: Store<ItemState>) {}

  toggleCheckbox($event: Event) {
    this.store.dispatch(
      updatePrice({
        itemId: this.itemId,
        sizeId: this.property.sizeId,
        price: this.property.price,
        isChecked: ($event.target as HTMLInputElement).checked,
      })
    );
  }

  changePrice(price: number) {
    this.store.dispatch(
      updatePrice({
        itemId: this.itemId,
        sizeId: this.property.sizeId,
        price: price,
        isChecked: this.property.isChecked,
      })
    );
  }
}

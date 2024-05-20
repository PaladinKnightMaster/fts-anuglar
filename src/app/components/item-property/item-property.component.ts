import { Component, Input } from '@angular/core';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ItemState } from '@/store/item/item.reducer';
import { updatePrice } from '@/store/item/item.actions';
import { Property } from '@/models/data.model';

/**
 * The `ItemPropertyComponent` is a standalone Angular component that provides a reusable UI element for displaying and editing item properties.
 * It imports the `CurrencyInputComponent` and `DecimalPipe` to handle currency input and formatting.
 * The component is defined with the `fts-item-property` selector and uses the `item-property.component.html` template and `item-property.component.css` styles.
 */
@Component({
  selector: 'fts-item-property',
  standalone: true,
  imports: [CurrencyInputComponent, DecimalPipe],
  templateUrl: './item-property.component.html',
  styleUrl: './item-property.component.css',
})
/**
 * The `ItemPropertyComponent` is a UI component that represents a single property of an item.
 * It is responsible for rendering the property value and handling any user interactions with the property.
 */
export class ItemPropertyComponent {
  @Input() itemId: number = 0;
  @Input() property!: Property;

  constructor(private store: Store<ItemState>) {}

  /**
   * Toggles the checkbox state for the item property and updates the price accordingly.
   *
   * @param $event - The event object from the checkbox click.
   */
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

  /**
   * Updates the price of the item property.
   *
   * @param price - The new price for the item property.
   */
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

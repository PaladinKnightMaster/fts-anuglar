import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * The `CurrencyInputComponent` is a standalone Angular component that provides a currency input field.
 * It uses the `FormsModule` to handle form input and validation.
 * The component is configured with a `selector` of `fts-currency-input`, and has a `templateUrl` and `styleUrl` defined.
 */
@Component({
  selector: 'fts-currency-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css',
})
/**
 * A component that provides a currency input field with event emitter for value changes.
 *
 * @param price - The initial price value for the input field.
 * @param disabled - Determines whether the input field is disabled or not.
 * @event changePriceEvent - Emits the new price value when the input field value changes.
 */
export class CurrencyInputComponent {
  @Input() price: number = 0;
  @Input() disabled: boolean = false;

  @Output() changePriceEvent = new EventEmitter<number>();

  /**
   * Prevents the user from entering 'e', 'E', '+', or '-' characters in the input field.
   * This is used to ensure that the input is a valid number.
   *
   * @param $event - The keyboard event object.
   */
  blockInvalidChar($event: KeyboardEvent) {
    ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault();
  }

  /**
   * Emits the changed price value when the input value changes.
   *
   * @param $event - The input event object containing the new value.
   * @emits changePriceEvent - Emits the new price value.
   */
  changeValue($event: Event) {
    this.changePriceEvent.emit(
      Number(($event.target as HTMLInputElement).value)
    );
  }
}

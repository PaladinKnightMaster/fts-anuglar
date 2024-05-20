import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fts-currency-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css',
})
export class CurrencyInputComponent {
  @Input() price: number = 0;
  @Input() disabled: boolean = false;

  @Output() changePriceEvent = new EventEmitter<number>();

  blockInvalidChar($event: KeyboardEvent) {
    ['e', 'E', '+', '-'].includes($event.key) && $event.preventDefault();
  }

  changeValue($event: Event) {
    this.changePriceEvent.emit(
      Number(($event.target as HTMLInputElement).value)
    );
  }
}

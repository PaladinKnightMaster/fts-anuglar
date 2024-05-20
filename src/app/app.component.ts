import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { Store } from '@ngrx/store';
import { ItemState } from './store/item/item.reducer';

/**
 * The root component of the application, which serves as the entry point for the application.
 * This component is marked as standalone, meaning it can be used independently without a parent module.
 * It imports the `RouterOutlet` and `ItemListComponent` to provide routing and item list functionality.
 * The component's template and styles are defined in the corresponding HTML and CSS files.
 */
@Component({
  selector: 'fts-app-root',
  standalone: true,
  imports: [RouterOutlet, ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fts-anuglar';

  constructor(private store: Store<ItemState>) {}
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { Store } from '@ngrx/store';
import { ItemState } from './store/item/item.reducer';

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

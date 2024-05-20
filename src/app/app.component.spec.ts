import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { routes } from './app.routes'; // Import your routes if you have a routing module
import { ItemState } from './store/item/item.reducer';

describe('AppComponent', () => {
  let store: MockStore<ItemState>;
  const initialState: ItemState = {
    items: [],
    prevItems: null,
    selectedItem: -1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Import AppComponent as it is a standalone component
        ItemListComponent, // Import ItemListComponent as it is a standalone component
      ],
      providers: [
        provideRouter(routes), // Provide router with routes
        provideMockStore({ initialState })
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fts-anuglar'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fts-anuglar');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Pizza');
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ItemListComponent } from './item-list.component';
import { ItemComponent } from '@/components/item/item.component';
import { ItemState } from '@/store/item/item.reducer';
import { selectItem, selectItems } from '@/store/item/item.selectors';
import { setSelectedItem } from '@/store/item/item.actions';
import { Observable, of } from 'rxjs';
import { Item } from '@/models/data.model';
import { By } from '@angular/platform-browser';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let store: MockStore<ItemState>;
  let mockSelectedItem$: Observable<number>;
  let mockItems$: Observable<Item[]>;

  const initialState: ItemState = {
    items: [
      {
        originItem: { itemId: 1, name: 'Item 1' },
        properties: [],
        changed: false,
      },
      {
        originItem: { itemId: 2, name: 'Item 2' },
        properties: [],
        changed: false,
      },
    ],
    prevItems: null,
    selectedItem: -1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent, ItemListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectItems, initialState.items);
    store.overrideSelector(selectItem, initialState.selectedItem);

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;

    mockItems$ = of(initialState.items);
    mockSelectedItem$ = of(initialState.selectedItem);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should display loading template when items are not yet loaded or items array is empty', () => {
  // Set selectedItem$ to an observable emitting 0 to simulate loading state
  component.items$ = of([])
  fixture.detectChanges();

  console.log(fixture.debugElement)

  // Check if the loading text is present
  const loadingElement = fixture.debugElement.query(By.css('.item-list')).nativeElement;
  expect(loadingElement.textContent).toContain('loading...');
});

  it('should display item components when items are loaded', () => {
    component.items$ = mockItems$;
    component.selectedItem$ = mockSelectedItem$;
    fixture.detectChanges();

    const itemComponents = fixture.debugElement.queryAll(By.css('fts-item'));
    expect(itemComponents.length).toBe(2);
  });

  it('should highlight the selected item', () => {
    component.items$ = mockItems$;
    component.selectedItem$ = of(1);
    fixture.detectChanges();

    const itemComponents = fixture.debugElement.queryAll(By.css('fts-item'));
    const firstItem = itemComponents[0].componentInstance as ItemComponent;
    const secondItem = itemComponents[1].componentInstance as ItemComponent;

    expect(firstItem.isActive).toBe(true);
    expect(secondItem.isActive).toBe(false);
  });

  it('should dispatch setSelectedItem action on item click', () => {
    component.items$ = mockItems$;
    component.selectedItem$ = mockSelectedItem$;
    fixture.detectChanges();

    const itemComponents = fixture.debugElement.queryAll(By.css('fts-item'));
    const firstItemDebugElement = itemComponents[0];

    firstItemDebugElement.triggerEventHandler('clickItemEvent', 1);
    expect(store.dispatch).toHaveBeenCalledWith(
      setSelectedItem({ selectedItem: 1 })
    );
  });
});

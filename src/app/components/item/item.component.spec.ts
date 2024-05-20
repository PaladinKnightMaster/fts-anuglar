import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { ItemComponent } from './item.component';
import { ItemPropertyComponent } from '@/components/item-property/item-property.component';
import { ItemState } from '@/store/item/item.reducer';
import { undoChanges } from '@/store/item/item.actions';
import { Item } from '@/models/data.model';
import { DebugElement } from '@angular/core';
import { items, itemPrices, itemSizes } from '@/../assets/data';

/**
 * Spec tests for the `ItemComponent` component.
 * This suite of tests verifies the behavior of the `ItemComponent` component, including rendering the item name, emitting events when the header is clicked, dispatching actions when the undo button is clicked, rendering item properties, and applying CSS classes based on the `isActive` state.
 */
describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let store: MockStore<ItemState>;
  let dispatchSpy: jasmine.Spy;

  const item: Item = {
    originItem: {
      itemId: 1,
      name: 'Pepperoni',
    },
    properties: [
      { sizeId: 0, price: 4.42, sizeName: 'Small', isChecked: false },
      { sizeId: 1, price: 6.52, sizeName: 'Medium', isChecked: true },
    ],
    changed: true,
  };

  /**
   * Defines the initial state of the `ItemState` object, which includes an array of items with their associated properties, the previous state of the items, and the index of the currently selected item.
   *
   * The `items` array is created by mapping over the `items` array and creating an object for each item that includes the original item, an array of item properties (sizes and prices), and a flag indicating whether the item has been changed.
   *
   * The `prevItems` property is set to `null`, indicating that there is no previous state.
   *
   * The `selectedItem` property is set to `-1`, indicating that no item is currently selected.
   */
  const initialState: ItemState = {
    items: items.map((originItem) => ({
      originItem,
      properties: itemPrices
        .filter((price) => price.itemId === originItem.itemId)
        .map((price) => ({
          sizeId: price.sizeId,
          price: price.price,
          sizeName:
            itemSizes.find((size) => size.sizeId === price.sizeId)?.name || '',
          isChecked: false, // Assuming initial state has unchecked properties
        })),
      changed: false,
    })),
    prevItems: null,
    selectedItem: -1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemComponent,
        ItemPropertyComponent,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    component.isActive = true; // Set initial isActive state
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render item name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.item__header__title')?.textContent
    ).toContain('Pepperoni');
  });

  it('should emit clickItemEvent with item id when header is clicked', () => {
    spyOn(component.clickItemEvent, 'emit');
    const header: DebugElement = fixture.debugElement.query(
      By.css('.item__header')
    );

    header.triggerEventHandler('click', null);
    expect(component.clickItemEvent.emit).toHaveBeenCalledWith(1);
  });

  it('should dispatch undoChanges action when undo button is clicked', () => {
    const button: DebugElement = fixture.debugElement.query(
      By.css('.undo-btn')
    );

    button.triggerEventHandler('click', null);
    expect(dispatchSpy).toHaveBeenCalledWith(undoChanges({ itemId: 1 }));
  });

  it('should render properties', () => {
    const properties = fixture.debugElement.queryAll(
      By.directive(ItemPropertyComponent)
    );
    expect(properties.length).toBe(2);
  });

  it('should apply active class when isActive is true', () => {
    const itemElement: HTMLElement =
      fixture.nativeElement.querySelector('.item');
    expect(itemElement.classList).toContain('item--active');
  });

  it('should apply collapse class when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    const itemElement: HTMLElement =
      fixture.nativeElement.querySelector('.item');
    expect(itemElement.classList).toContain('item--collapse');
  });
});

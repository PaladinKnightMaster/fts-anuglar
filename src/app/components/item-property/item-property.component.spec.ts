import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { ItemPropertyComponent } from './item-property.component';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { updatePrice } from '@/store/item/item.actions';
import { Property } from '@/models/data.model';
import { DecimalPipe } from '@angular/common';

/**
 * Spec file for the `ItemPropertyComponent` component.
 * This file contains unit tests for the `ItemPropertyComponent` component, which is responsible for rendering a property (size, price, and checkbox) for an item.
 * The tests cover the component's behavior, including rendering the checkbox and label correctly, dispatching actions when the checkbox is toggled or the price is changed, and disabling/enabling the price input based on the checkbox state.
 */
describe('ItemPropertyComponent', () => {
  let component: ItemPropertyComponent;
  let fixture: ComponentFixture<ItemPropertyComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPropertyComponent, CurrencyInputComponent],
      providers: [provideMockStore({ initialState }), DecimalPipe],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ItemPropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the checkbox and label correctly', () => {
    const mockProperty: Property = {
      sizeId: 1,
      sizeName: 'Size 1',
      price: 100,
      isChecked: true,
    };
    component.itemId = 1;
    component.property = mockProperty;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(
      By.css('.property__checkbox')
    ).nativeElement;
    const label = fixture.debugElement.query(
      By.css('.property__label')
    ).nativeElement;

    expect(checkbox.checked).toBe(true);
    expect(label.textContent).toContain(mockProperty.sizeName);
  });

  it('should dispatch updatePrice action when checkbox is toggled', () => {
    const mockProperty: Property = {
      sizeId: 1,
      sizeName: 'Size 1',
      price: 100,
      isChecked: false,
    };
    component.itemId = 1;
    component.property = mockProperty;
    fixture.detectChanges();

    spyOn(store, 'dispatch');

    const checkbox = fixture.debugElement.query(
      By.css('.property__checkbox')
    ).nativeElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      updatePrice({
        itemId: component.itemId,
        sizeId: component.property.sizeId,
        price: component.property.price,
        isChecked: true,
      })
    );
  });

  it('should dispatch updatePrice action when price is changed', () => {
    const mockProperty: Property = {
      sizeId: 1,
      sizeName: 'Size 1',
      price: 100,
      isChecked: true,
    };
    component.itemId = 1;
    component.property = mockProperty;
    fixture.detectChanges();

    spyOn(store, 'dispatch');

    const currencyInput = fixture.debugElement.query(
      By.directive(CurrencyInputComponent)
    ).componentInstance;
    currencyInput.changePriceEvent.emit(150);

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      updatePrice({
        itemId: component.itemId,
        sizeId: component.property.sizeId,
        price: 150,
        isChecked: component.property.isChecked,
      })
    );
  });

  it('should disable input when checkbox is unchecked', () => {
    const mockProperty: Property = {
      sizeId: 1,
      sizeName: 'Size 1',
      price: 100,
      isChecked: false,
    };
    component.itemId = 1;
    component.property = mockProperty;
    fixture.detectChanges();

    const currencyInput = fixture.debugElement.query(
      By.directive(CurrencyInputComponent)
    ).componentInstance;
    expect(currencyInput.disabled).toBe(true);
  });

  it('should enable input when checkbox is checked', () => {
    const mockProperty: Property = {
      sizeId: 1,
      sizeName: 'Size 1',
      price: 100,
      isChecked: true,
    };
    component.itemId = 1;
    component.property = mockProperty;
    fixture.detectChanges();

    const currencyInput = fixture.debugElement.query(
      By.directive(CurrencyInputComponent)
    ).componentInstance;
    expect(currencyInput.disabled).toBe(false);
  });
});

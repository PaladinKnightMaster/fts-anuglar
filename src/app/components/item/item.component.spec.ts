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

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let store: MockStore<ItemState>;
  let dispatchSpy: jasmine.Spy;

  const item: Item = {
    originItem: {
      itemId: 1,
      name: 'Pepperoni'
    },
    properties: [
      { sizeId: 0, price: 4.42, sizeName: 'Small', isChecked: false },
      { sizeId: 1, price: 6.52, sizeName: 'Medium', isChecked: true }
    ],
    changed: true
  };

  const initialState: ItemState = {
    items: items.map(originItem => ({
      originItem,
      properties: itemPrices
        .filter(price => price.itemId === originItem.itemId)
        .map(price => ({
          sizeId: price.sizeId,
          price: price.price,
          sizeName: itemSizes.find(size => size.sizeId === price.sizeId)?.name || '',
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
        ItemComponent, // Import ItemComponent as it is a standalone component
        ItemPropertyComponent, // Import ItemPropertyComponent as it is a standalone component
      ],
      providers: [
        provideMockStore({ initialState })
      ]
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
    expect(compiled.querySelector('.item__header__title')?.textContent).toContain('Pepperoni');
  });

  it('should emit clickItemEvent with item id when header is clicked', () => {
    spyOn(component.clickItemEvent, 'emit');
    const header: DebugElement = fixture.debugElement.query(By.css('.item__header'));
    
    header.triggerEventHandler('click', null);
    expect(component.clickItemEvent.emit).toHaveBeenCalledWith(1);
  });

  it('should dispatch undoChanges action when undo button is clicked', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('.undo-btn'));
    
    button.triggerEventHandler('click', null);
    expect(dispatchSpy).toHaveBeenCalledWith(undoChanges({ itemId: 1 }));
  });

  it('should render properties', () => {
    const properties = fixture.debugElement.queryAll(By.directive(ItemPropertyComponent));
    expect(properties.length).toBe(2);
  });

  it('should apply active class when isActive is true', () => {
    const itemElement: HTMLElement = fixture.nativeElement.querySelector('.item');
    expect(itemElement.classList).toContain('item--active');
  });

  it('should apply collapse class when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    const itemElement: HTMLElement = fixture.nativeElement.querySelector('.item');
    expect(itemElement.classList).toContain('item--collapse');
  });
});
import { itemReducer, initialState, ItemState } from './item.reducer';
import * as ItemActions from './item.actions';
import { Item, Property } from '@/models/data.model';

/**
 * Tests for the `itemReducer` function, which manages the state of items in the application.
 * The tests cover various actions that can be performed on the item state, such as setting the items,
 * selecting an item, updating the price of an item, undoing changes, and more.
 */
describe('ItemReducer', () => {
  let initialItems: Item[];
  let initialProperties: Property[];

  beforeEach(() => {
    initialProperties = [
      { sizeId: 0, price: 100, sizeName: 'Small', isChecked: true },
      { sizeId: 1, price: 200, sizeName: 'Medium', isChecked: false },
    ];

    initialItems = [
      {
        originItem: { itemId: 1, name: 'Item 1' },
        properties: initialProperties,
        changed: false,
      },
    ];
  });

  it('should return the initial state', () => {
    const action = {} as any;
    const state = itemReducer(undefined, action);

    expect(state).toEqual(initialState);
  });

  it('should set the items', () => {
    const action = ItemActions.setItems({ items: initialItems });
    const state = itemReducer(initialState, action);

    expect(state.items).toEqual(initialItems);
  });

  it('should set the selected item', () => {
    const action = ItemActions.setSelectedItem({ selectedItem: 1 });
    const state = itemReducer(initialState, action);

    expect(state.selectedItem).toEqual(1);
  });

  it('should toggle the selected item if it is already selected', () => {
    const stateWithSelectedItem: ItemState = {
      ...initialState,
      selectedItem: 1,
    };

    const action = ItemActions.setSelectedItem({ selectedItem: 1 });
    const state = itemReducer(stateWithSelectedItem, action);

    expect(state.selectedItem).toEqual(-1);
  });

  it('should update the price of an item', () => {
    const payload = { itemId: 1, sizeId: 0, isChecked: false, price: 150 };
    const action = ItemActions.updatePrice(payload);
    const state = itemReducer({ ...initialState, items: initialItems }, action);

    expect(state.items[0].properties[0].price).toEqual(150);
    expect(state.items[0].properties[0].isChecked).toBeFalse();
  });

  it('should mark items as changed when updating the price', () => {
    const prevItems = initialItems;
    const payload = { itemId: 1, sizeId: 0, isChecked: false, price: 150 };
    const action = ItemActions.updatePrice(payload);
    const stateWithPrevItems: ItemState = {
      ...initialState,
      items: initialItems,
      prevItems,
    };

    const state = itemReducer(stateWithPrevItems, action);

    expect(state.items[0].changed).toBeTrue();
  });

  it('should set previous items', () => {
    const action = ItemActions.setPrevItems({ prevItems: initialItems });
    const state = itemReducer(initialState, action);

    expect(state.prevItems).toEqual(initialItems);
  });

  it('should undo changes for an item', () => {
    const updatedProperties = [
      { sizeId: 0, price: 150, sizeName: 'Small', isChecked: false },
      { sizeId: 1, price: 250, sizeName: 'Medium', isChecked: true },
    ];

    const updatedItems = [
      {
        originItem: { itemId: 1, name: 'Item 1' },
        properties: updatedProperties,
        changed: true,
      },
    ];

    const stateWithUpdatedItems: ItemState = {
      ...initialState,
      items: updatedItems,
      prevItems: initialItems,
    };

    const action = ItemActions.undoChanges({ itemId: 1 });
    const state = itemReducer(stateWithUpdatedItems, action);

    expect(state.items[0]).toEqual(initialItems[0]);
  });

  it('should not change the state if undoChanges is called with a non-existent itemId', () => {
    const stateWithUpdatedItems: ItemState = {
      ...initialState,
      items: initialItems,
      prevItems: initialItems,
    };

    const action = ItemActions.undoChanges({ itemId: 2 });
    const state = itemReducer(stateWithUpdatedItems, action);

    expect(state).toEqual(stateWithUpdatedItems);
  });
});

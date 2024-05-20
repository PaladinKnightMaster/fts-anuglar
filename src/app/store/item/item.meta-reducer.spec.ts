import { ActionReducer, INIT } from '@ngrx/store';
import { getItems, itemMetaReducer, APP_PREFIX, ITEM_STATE_KEY } from './item.meta-reducer';
import { RootState } from '../index';

/**
 * Handles the state management for the item module, including initializing state from localStorage or a default state, and synchronizing state changes with localStorage.
 */
describe('Item Meta Reducer', () => {
  let mockReducer: ActionReducer<RootState>;

  beforeEach(() => {
    mockReducer = jasmine
      .createSpy('mockReducer')
      .and.callFake((state, action) => state);
  });

  it('should initialize state from localStorage', () => {
    const storedState: RootState = {
      item: {
        items: [
          {
            originItem: { itemId: 0, name: 'Margherita' },
            properties: [
              { sizeId: 0, price: 3.99, sizeName: 'Small', isChecked: false },
              { sizeId: 1, price: 5.99, sizeName: 'Medium', isChecked: false },
              { sizeId: 2, price: 7.99, sizeName: 'Large', isChecked: false },
            ],
            changed: false,
          },
          {
            originItem: { itemId: 1, name: 'Pepperoni' },
            properties: [
              { sizeId: 0, price: 4.42, sizeName: 'Small', isChecked: false },
              { sizeId: 1, price: 6.52, sizeName: 'Medium', isChecked: false },
              { sizeId: 2, price: 8.62, sizeName: 'Large', isChecked: false },
            ],
            changed: false,
          },
        ],
        selectedItem: -1,
        prevItems: [],
      },
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedState));
    const reducer = itemMetaReducer(mockReducer);
    const state = reducer(undefined, { type: INIT });

    expect(state).toEqual(storedState);
  });

  it('should initialize state from file if localStorage is empty', () => {
    // Ensure localStorage is empty
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const reducer = itemMetaReducer(mockReducer);
    const initialState = reducer(undefined, { type: INIT });

    const data = getItems() ?? [];
    // Expected state
    const expectedState: RootState = {
      item: { items: data, selectedItem: -1, prevItems: data },
    };

    expect(initialState).toEqual(expectedState);
  });

  it('should synchronize state with localStorage on item actions', () => {
    spyOn(localStorage, 'setItem');
    const reducer = itemMetaReducer(mockReducer);
    const initialState: RootState = {
      item: {
        items: [],
        selectedItem: -1,
        prevItems: [],
      },
    };
    const action = { type: '[Item] Set Items', items: [] };
    const state = reducer(initialState, action);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      `${APP_PREFIX}_${ITEM_STATE_KEY}`,
      JSON.stringify(state)
    );
  });
});

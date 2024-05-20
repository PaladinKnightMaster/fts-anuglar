import { selectItemState, selectState, selectItems, selectItem, selectPrevItems } from './item.selectors';
import { ItemState } from './item.reducer';

/**
 * Selectors for the item state in the application store.
 * These selectors provide access to various properties of the item state, such as the list of items, the selected item, and the previous items.
 */
describe('ItemSelectors', () => {
  const initialProperties = [
    { sizeId: 0, price: 100, sizeName: 'Small', isChecked: true },
    { sizeId: 1, price: 200, sizeName: 'Medium', isChecked: false },
  ];

  const initialItems = [
    {
      originItem: { itemId: 1, name: 'Item 1' },
      properties: initialProperties,
      changed: false,
    },
  ];

  const initialState: ItemState = {
    items: initialItems,
    prevItems: null,
    selectedItem: -1,
  };

  it('should select the feature state', () => {
    const result = selectItemState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the state', () => {
    const result = selectState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the items', () => {
    const result = selectItems.projector(initialState);
    expect(result).toEqual(initialItems);
  });

  it('should select the selected item', () => {
    const result = selectItem.projector(initialState);
    expect(result).toEqual(-1);
  });

  it('should select the previous items', () => {
    const stateWithPrevItems: ItemState = {
      ...initialState,
      prevItems: initialItems,
    };

    const result = selectPrevItems.projector(stateWithPrevItems);
    expect(result).toEqual(initialItems);
  });

  it('should return null for previous items if prevItems is not set', () => {
    const result = selectPrevItems.projector(initialState);
    expect(result).toBeNull();
  });
});

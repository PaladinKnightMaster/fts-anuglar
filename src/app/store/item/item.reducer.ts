import { createReducer, on } from '@ngrx/store';
import {
  setItems,
  setPrevItems,
  setSelectedItem,
  undoChanges,
  updatePrice,
} from './item.actions';
import { Item, Property } from '@/models/data.model';

export interface ItemState {
  items: Item[];
  prevItems: Item[] | null;
  selectedItem: number;
}

export const initialState: ItemState = {
  items: [],
  prevItems: null,
  selectedItem: -1,
};

/**
 * Updates the properties of an item by mapping over the provided properties array and updating the price and isChecked properties for the property with the matching sizeId.
 *
 * @param properties - The array of properties to update.
 * @param payload - An object containing the sizeId, price, and isChecked values to update.
 * @returns A new array of properties with the updated values.
 */
const updateProperties = (properties: Property[], payload: any) =>
  properties.map((property) =>
    property.sizeId === payload.sizeId
      ? { ...property, price: payload.price, isChecked: payload.isChecked }
      : property
  );

/**
 * Updates the properties of an item in the given array of items.
 *
 * @param items - The array of items to update.
 * @param payload - The payload containing the item ID and the updated properties.
 * @returns A new array of items with the updated properties.
 */
const findItemAndUpdate = (items: Item[], payload: any) =>
  items.map((item) =>
    item.originItem.itemId === payload.itemId
      ? { ...item, properties: updateProperties(item.properties, payload) }
      : item
  );

/**
 * Marks items as changed based on a comparison with previous items.
 *
 * @param items - The current items to be marked.
 * @param prevItems - The previous items to compare against.
 * @returns The items with the 'changed' property set as appropriate.
 */
const markChangedItems = (items: Item[], prevItems: Item[] | null) => {
  if (!prevItems) return items;
  return items.map((item) => {
    const prevItem = prevItems.find(
      (prev) => prev.originItem.itemId === item.originItem.itemId
    );
    if (prevItem) {
      const changed = item.properties.some((prop) => {
        const prevProp = prevItem.properties.find(
          (prevProp) => prevProp.sizeId === prop.sizeId
        );
        return (
          !prevProp ||
          prop.price !== prevProp.price ||
          prop.isChecked !== prevProp.isChecked
        );
      });
      return { ...item, changed };
    }
    return item;
  });
};

/**
 * The item reducer manages the state of items in the application.
 * It handles actions for setting items, selecting an item, updating item prices,
 * setting previous item states, and undoing changes to items.
 */
export const itemReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items })),

  on(setSelectedItem, (state, { selectedItem }) => ({
    ...state,
    selectedItem: state.selectedItem === selectedItem ? -1 : selectedItem,
  })),

  on(updatePrice, (state, payload) => {
    const updatedItems = findItemAndUpdate(state.items, payload);
    const markedItems = markChangedItems(updatedItems, state.prevItems);
    return { ...state, items: markedItems };
  }),

  on(setPrevItems, (state, { prevItems }) => ({
    ...state,
    prevItems,
  })),

  on(undoChanges, (state, { itemId }) => {
    if (!state?.prevItems) return state;
    const prevItem = state.prevItems.find(
      (item) => item.originItem.itemId === itemId
    );
    if (!prevItem) return state;

    const updatedItems = state.items.map((item) =>
      item.originItem.itemId === itemId ? { ...prevItem } : item
    );

    return { ...state, items: updatedItems };
  })
);

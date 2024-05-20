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

const updateProperties = (properties: Property[], payload: any) => 
  properties.map(property => 
    property.sizeId === payload.sizeId 
      ? { ...property, price: payload.price, isChecked: payload.isChecked } 
      : property
  );

const findItemAndUpdate = (items: Item[], payload: any) => 
  items.map(item => 
    item.originItem.itemId === payload.itemId 
      ? { ...item, properties: updateProperties(item.properties, payload) } 
      : item
  );

const markChangedItems = (items: Item[], prevItems: Item[] | null) => {
  if (!prevItems) return items;
  return items.map(item => {
    const prevItem = prevItems.find(prev => prev.originItem.itemId === item.originItem.itemId);
    if (prevItem) {
      const changed = item.properties.some(prop => {
        const prevProp = prevItem.properties.find(prevProp => prevProp.sizeId === prop.sizeId);
        return !prevProp || prop.price !== prevProp.price || prop.isChecked !== prevProp.isChecked;
      });
      return { ...item, changed };
    }
    return item;
  });
};

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
    if (!state.prevItems) return state;
    const prevItem = state.prevItems.find(item => item.originItem.itemId === itemId);
    if (!prevItem) return state;

    const updatedItems = state.items.map(item => 
      item.originItem.itemId === itemId ? { ...prevItem } : item
    );

    return { ...state, items: updatedItems };
  })
);
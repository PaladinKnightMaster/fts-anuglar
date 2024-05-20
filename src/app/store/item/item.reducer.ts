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

export const itemReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items })),

  on(setSelectedItem, (state, { selectedItem }) => ({
    ...state,
    selectedItem: state.selectedItem == selectedItem ? -1 : selectedItem,
  })),

  on(updatePrice, (state, payload) => {
    const tempItems: Item[] = [];

    state.items.forEach((currentItem) => {
      if (currentItem.originItem.itemId == payload.itemId) {
        const tempProperties: Property[] = [];
        currentItem.properties.forEach((property) => {
          if (property.sizeId == payload.sizeId) {
            tempProperties.push({
              ...property,
              price: payload.price,
              isChecked: payload.isChecked,
            });
          } else {
            tempProperties.push({ ...property });
          }
        });
        tempItems.push({ ...currentItem, properties: tempProperties });
      } else {
        tempItems.push({ ...currentItem });
      }
    });

    // Check if the data is changed
    const prevItem = state.prevItems?.find(
      (item) => item.originItem.itemId == payload.itemId
    );
    if (prevItem) {
      const item = tempItems.find(
        (currentItem) =>
          currentItem.originItem.itemId == prevItem.originItem.itemId
      );
      if (item) {
        let changed = false;
        item.properties.forEach((itemProperty) => {
          const prevItemProperty = prevItem.properties.find(
            (prevProperty) => prevProperty.sizeId == itemProperty.sizeId
          );

          if (
            !(
              itemProperty?.price == prevItemProperty?.price &&
              itemProperty?.isChecked == prevItemProperty?.isChecked
            )
          ) {
            changed = true;
          }
          item.changed = changed;
        });
      }
    }
    return { ...state, items: tempItems };
  }),

  on(setPrevItems, (state, { prevItems }) => ({
    ...state,
    prevItems: prevItems,
  })),

  on(undoChanges, (state, { itemId }) => {
    const prevItem = state.prevItems?.find(
      (item) => item.originItem.itemId == itemId
    );
    if (prevItem) {
      const tempItems: Item[] = [];

      state.items.forEach((currentItem) => {
        if (currentItem.originItem.itemId == prevItem.originItem.itemId) {
          tempItems.push({ ...prevItem });
        } else {
          tempItems.push({ ...currentItem });
        }
      });
      return { ...state, items: tempItems };
    } else {
      return state;
    }
  })
);

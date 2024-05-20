import { ActionReducer, INIT } from '@ngrx/store';
import { RootState } from '../index';
import { items, itemPrices, itemSizes } from '@/../assets/data';

// Prefix
export const APP_PREFIX = 'fts-angular';
export const ITEM_STATE_KEY = 'item';

// Categorize Item
const getItems = () => {
  if (items && items.length > 0) {
    try {
      return items.map((item) => {
        const properties = itemPrices
          .filter((price) => price.itemId === item.itemId)
          .map((price) => {
            const size = itemSizes.find((size) => size.sizeId === price.sizeId);
            return {
              sizeId: price.sizeId,
              price: price.price,
              sizeName: size ? size.name : 'Unknown',
              isChecked: true,
            };
          });
        const originItem = {
          itemId: item.itemId + 1, // to avoid 0 index for *ngIf directive
          name: item.name,
        };
        return {
          originItem,
          properties,
          changed: false,
        };
      });
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

export const itemMetaReducer = (
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
  return (state, action) => {
    // if the app is initialized, check if there is data in localStorage to load, otherwise, load data from file.
    if (action.type === INIT) {
      // load data from localStorage
      const storageValue = localStorage.getItem(
        `${APP_PREFIX}_${ITEM_STATE_KEY}`
      );

      try {
        state = JSON.parse(storageValue ? storageValue : '');
        console.log(state);
      } catch {
        // loda data from file
        const data = getItems();
        if (!data.length) {
          alert('There is no data available. Please check the database.');
        }

        // When there is no data in localStorage
        localStorage.setItem(
          `${APP_PREFIX}_${ITEM_STATE_KEY}`,
          JSON.stringify({
            item: { items: data, selectedItem: -1, prevItems: data },
          })
        );

        state = { item: { items: data, selectedItem: -1, prevItems: data } };
      }
    }
    const nextState = reducer(state, action);

    // synchronize data with localStorage
    if (action.type.includes('[Item]')) {
      localStorage.setItem(
        `${APP_PREFIX}_${ITEM_STATE_KEY}`,
        JSON.stringify(nextState)
      );
    }

    return nextState;
  };
};

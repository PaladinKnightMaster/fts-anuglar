import { ActionReducer, INIT } from '@ngrx/store';
import { RootState } from '../index';
import { items, itemPrices, itemSizes } from '@/../assets/data';

export const APP_PREFIX = 'fts-angular';
export const ITEM_STATE_KEY = 'item';

// Function to safely parse JSON with failure fallback
const safeParseJSON = (jsonString: string, fallback: any) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

// Function to retrieve item properties
const getItemProperties = (itemId: number) => {
  return itemPrices
    .filter(price => price.itemId === itemId)
    .map(price => {
      const size = itemSizes.find(size => size.sizeId === price.sizeId);
      return {
        sizeId: price.sizeId,
        price: price.price,
        sizeName: size?.name ?? 'Unknown',
        isChecked: true,
      };
    });
};

// Function to retrieve items with enhanced error handling and structure
export const getItems = () => {
  if (items?.length === 0) {
    return [];
  }

  try {
    return items.map(item => ({
      originItem: {
        itemId: item.itemId + 1, // to avoid 0 index for *ngIf directive
        name: item.name,
      },
      properties: getItemProperties(item.itemId),
      changed: false,
    }));
  } catch (error) {
    console.error('Error processing items:', error);
    return [];
  }
};

// Meta-reducer for item state initialization and synchronization
export const itemMetaReducer = (
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> => {
  return (state, action) => {
    if (action.type === INIT) {
      const storedData = localStorage.getItem(`${APP_PREFIX}_${ITEM_STATE_KEY}`);
      state = safeParseJSON(storedData ?? '', null);

      if (!state) {
        const data = getItems();
        if (!data.length) {
          console.warn('There is no data available. Please check the database.');
        }

        const initialState = { item: { items: data, selectedItem: -1, prevItems: data } };
        localStorage.setItem(
          `${APP_PREFIX}_${ITEM_STATE_KEY}`,
          JSON.stringify(initialState)
        );
        state = initialState;
      }
    }

    const nextState = reducer(state, action);

    if (action.type.includes('[Item]')) {
      localStorage.setItem(
        `${APP_PREFIX}_${ITEM_STATE_KEY}`,
        JSON.stringify(nextState)
      );
    }

    return nextState;
  };
};
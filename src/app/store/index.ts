import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ItemState, itemReducer } from './item/item.reducer';
import { itemMetaReducer } from './item/item.meta-reducer';

export interface RootState {
  item: ItemState;
}

export const reducers: ActionReducerMap<RootState> = {
  item: itemReducer,
};

export const metaReducers: MetaReducer[] = [itemMetaReducer];

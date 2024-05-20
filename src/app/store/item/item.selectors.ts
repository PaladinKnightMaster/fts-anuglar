import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('item');

export const selectState = createSelector(
  selectItemState,
  (state: ItemState) => state
);

export const selectItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItem = createSelector(
  selectItemState,
  (state: ItemState) => state.selectedItem
);

export const selectPrevItems = createSelector(
  selectItemState,
  (state: ItemState) => state.prevItems
);

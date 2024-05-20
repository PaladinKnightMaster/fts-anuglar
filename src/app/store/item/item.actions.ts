import { Item, Property } from '@/models/data.model';
import { createAction, props } from '@ngrx/store';

export const setItems = createAction(
  '[Item] Set Items',
  props<{ items: Item[] }>()
);
export const setSelectedItem = createAction(
  '[Item] Set SelectedItem',
  props<{ selectedItem: number }>()
);

export const updatePrice = createAction(
  '[Item] Update Price',
  props<{ itemId: number; sizeId: number; isChecked: boolean; price: number }>()
);

export const setPrevItems = createAction(
  '[Item] Set Previous Items',
  props<{ prevItems: Item[] | null }>()
);

export const undoChanges = createAction(
  '[Item] Undo Changes',
  props<{ itemId: number }>()
);

import * as fromItemActions from './item.actions';
import { Item } from '@/models/data.model';

describe('Item Actions', () => {
  it('should create an action to set items', () => {
    const items: Item[] = [
      {
        originItem: { itemId: 1, name: 'Item 1' },
        properties: [
          { sizeId: 0, price: 10, sizeName: 'Small', isChecked: true },
          { sizeId: 1, price: 15, sizeName: 'Medium', isChecked: false }
        ],
        changed: false
      }
    ];
    const action = fromItemActions.setItems({ items });

    expect(action.type).toEqual('[Item] Set Items');
    expect(action.items).toEqual(items);
  });

  it('should create an action to set selected item', () => {
    const selectedItem = 1;
    const action = fromItemActions.setSelectedItem({ selectedItem });

    expect(action.type).toEqual('[Item] Set SelectedItem');
    expect(action.selectedItem).toEqual(selectedItem);
  });

  it('should create an action to update price', () => {
    const itemId = 1;
    const sizeId = 2;
    const isChecked = true;
    const price = 100;
    const action = fromItemActions.updatePrice({ itemId, sizeId, isChecked, price });

    expect(action.type).toEqual('[Item] Update Price');
    expect(action.itemId).toEqual(itemId);
    expect(action.sizeId).toEqual(sizeId);
    expect(action.isChecked).toEqual(isChecked);
    expect(action.price).toEqual(price);
  });

  it('should create an action to set previous items', () => {
    const prevItems: Item[] = [
      {
        originItem: { itemId: 2, name: 'Item 2' },
        properties: [
          { sizeId: 1, price: 20, sizeName: 'Medium', isChecked: false },
          { sizeId: 2, price: 25, sizeName: 'Large', isChecked: true }
        ],
        changed: true
      }
    ];
    const action = fromItemActions.setPrevItems({ prevItems });

    expect(action.type).toEqual('[Item] Set Previous Items');
    expect(action.prevItems).toEqual(prevItems);
  });

  it('should create an action to undo changes', () => {
    const itemId = 1;
    const action = fromItemActions.undoChanges({ itemId });

    expect(action.type).toEqual('[Item] Undo Changes');
    expect(action.itemId).toEqual(itemId);
  });
});
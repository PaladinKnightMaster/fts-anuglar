export interface OriginItem {
  itemId: number;
  name: string;
}

export interface Size {
  sizeId: number;
  name: string;
}

export interface Price {
  itemId: number;
  sizeId: number;
  price: number;
}

export interface Item {
  originItem: OriginItem;
  properties: Property[];
  changed: boolean;
}

export interface Property {
  sizeId: number;
  price: number;
  sizeName: string;
  isChecked: boolean;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  createdAt: string;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export type SortOption =
  | "oldToNew"
  | "newToOld"
  | "priceHighToLow"
  | "priceLowToHigh";

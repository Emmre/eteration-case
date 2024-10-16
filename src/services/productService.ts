import { Product } from "../types/productTypes";

export const fetchProducts = async (page: number): Promise<Product[]> => {
  const res = await fetch(`https://api.example.com/products?page=${page}`);
  return res.json();
};

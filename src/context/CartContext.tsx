import React, { createContext, useEffect, useState } from "react";
import { Product, ProductWithQuantity } from "../types/productTypes";
import { getCartFromStorage, saveCartToStorage } from "../utils/storageUtils";

export type CartContextType = {
  cart: ProductWithQuantity[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    const storedCart = getCartFromStorage();
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        saveCartToStorage(updatedCart);
        return updatedCart;
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        const updatedCart = [...prevCart, productWithQuantity];
        saveCartToStorage(updatedCart);
        return updatedCart;
      }
    });
  };
  

  const removeProductFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateProductQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const value = {
    cart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

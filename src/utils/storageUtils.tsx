const CART_STORAGE_KEY = "cart";

export const getCartFromStorage = () => {
  if (typeof window === "undefined") return null;

  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: any) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

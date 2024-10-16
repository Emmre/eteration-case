import { ProductContext } from "@/context/ProductContext";
import { useContext } from "react";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

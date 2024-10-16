import React from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyles";
import Header from "@/components/Header";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </ProductProvider>
    </>
  );
}

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductProvider, ProductContext } from "../context/ProductContext";
import { describe, it, expect, beforeEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Product } from "@/types/productTypes";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: "100",
    image: "image1.jpg",
    brand: "Brand A",
    model: "Model X",
    createdAt: "2023-01-01",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Product 2",
    price: "200",
    image: "image2.jpg",
    brand: "Brand B",
    model: "Model Y",
    createdAt: "2023-01-02",
    description: "Description 2",
  },
];

const fetcher = createFetchMock(vi);
fetcher.enableMocks();

describe("ProductProvider", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponseOnce(JSON.stringify(mockProducts));
  });

  it("renders children and fetches products", async () => {
    render(
      <ProductProvider>
        <ProductContext.Consumer>
          {({ products, loading }) => {
            return (
              <>
                {loading ? <div>Loading...</div> : <div>Loaded Products</div>}
                {products.map((product) => (
                  <div key={product.id}>{product.name}</div>
                ))}
              </>
            );
          }}
        </ProductContext.Consumer>
      </ProductProvider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Loaded Products/)).toBeInTheDocument();
    });

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});

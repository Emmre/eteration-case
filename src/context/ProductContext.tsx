import { fetchProductList } from "@/services/productService";
import { Product, SortOption } from "@/types/productTypes";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface ProductContextType {
  products: Product[];
  brands: string[];
  filteredBrands: string[];
  models: string[];
  filteredModels: string[];
  loading: boolean;
  filteredProducts: Product[];
  currentPage: number;
  totalPages: number;
  filterByBrand: (brand: string[]) => void;
  filterByModel: (model: string[]) => void;
  sortValue: SortOption;
  sortBy: (sortBy: SortOption) => void;
  search: (value: string) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setPage: (page: number) => void;
}

const initialContext: ProductContextType = {
  products: [],
  brands: [],
  filteredBrands: [],
  models: [],
  filteredModels: [],
  loading: false,
  filteredProducts: [],
  currentPage: 1,
  totalPages: 1,
  filterByBrand: () => {},
  filterByModel: () => {},
  sortValue: "oldToNew",
  sortBy: () => {},
  search: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  setPage: () => {},
};

export const ProductContext = createContext<ProductContextType>(initialContext);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortValue, setSortValue] = useState<SortOption>("oldToNew");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchProductList();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const brands = useMemo(() => {
    return [...new Set(products.map((product) => product.brand))];
  }, [products]);

  const models = useMemo(() => {
    return [...new Set(products.map((product) => product.model))];
  }, [products]);

  const filteredBrands = useMemo(() => {
    if (selectedModels.length > 0) {
      return [
        ...new Set(
          products
            .filter((product) => selectedModels.includes(product.model))
            .map((product) => product.brand)
        ),
      ];
    }
    return brands;
  }, [selectedModels, brands, products]);

  const filteredModels = useMemo(() => {
    if (selectedBrands.length > 0) {
      return [
        ...new Set(
          products
            .filter((product) => selectedBrands.includes(product.brand))
            .map((product) => product.model)
        ),
      ];
    }
    return models;
  }, [selectedBrands, models, products]);

  const filterByBrand = useCallback((newBrands: string[]) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSelectedBrands(newBrands);
  }, []);

  const filterByModel = useCallback((newModels: string[]) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSelectedModels(newModels);
  }, []);

  const filterProducts = (
    products: Product[],
    brands?: string[],
    models?: string[],
    searchTerm?: string
  ) => {
    return products.filter((product) => {
      const matchesBrand =
        brands && brands.length > 0 ? brands.includes(product.brand) : true;
      const matchesModel =
        models && models.length > 0 ? models.includes(product.model) : true;
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesBrand && matchesModel && matchesSearch;
    });
  };

  const sortProducts = (products: Product[], sortValue: SortOption) => {
    const sortFunctions: Record<
      SortOption,
      (a: Product, b: Product) => number
    > = {
      oldToNew: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      newToOld: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      priceHighToLow: (a, b) => Number(b.price) - Number(a.price),
      priceLowToHigh: (a, b) => Number(a.price) - Number(b.price),
    };

    return products.sort(sortFunctions[sortValue]);
  };

  const applyFiltersAndSort = useCallback(() => {
    const filtered = filterProducts(
      products,
      selectedBrands,
      selectedModels,
      searchTerm
    );

    const sorted = sortProducts(filtered, sortValue);

    const totalPages = Math.ceil(sorted.length / pagination.limit);
    setTotalPages(totalPages);

    const paginatedProducts = sorted.slice(
      (pagination.page - 1) * pagination.limit,
      pagination.page * pagination.limit
    );

    setFilteredProducts(paginatedProducts);
  }, [
    products,
    selectedBrands,
    selectedModels,
    sortValue,
    searchTerm,
    pagination,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const sortBy = useCallback((newSortValue: SortOption) => {
    setSortValue(newSortValue);
  }, []);

  const search = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, totalPages),
    }));
  };

  const goToPreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(page, totalPages)),
    }));
  };

  const contextValue = useMemo(
    () => ({
      products,
      filteredProducts,
      brands,
      filteredBrands,
      models,
      filteredModels,
      loading,
      currentPage: pagination.page,
      totalPages,
      filterByBrand,
      filterByModel,
      sortValue,
      sortBy,
      search,
      goToNextPage,
      goToPreviousPage,
      setPage,
    }),
    [
      products,
      filteredProducts,
      brands,
      filteredBrands,
      models,
      filteredModels,
      loading,
      pagination.page,
      totalPages,
      filterByBrand,
      filterByModel,
      sortValue,
      sortBy,
      search,
      goToNextPage,
      goToPreviousPage,
      setPage,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

import React from "react";
import { Container, CircularProgress, Pagination, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filter";
import Basket from "@/components/Basket";
import { useProducts } from "@/hooks/useProducts";
import { StickyBasket, StickyFilters } from "@/styles/GlobalStyles";
import { useCart } from "@/hooks/useCarts";

const HomePage = () => {
  const { cart } = useCart();
  const { loading, products, filteredProducts, setPage, totalPages, currentPage } =
    useProducts();

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={4}>
        <StickyFilters size={{ xs: 12, md: 3, lg: 2 }}>
          <Filters />
        </StickyFilters>

        <Grid size={{ xs: 12, md: 6, lg: 8 }} pb={4}>
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {products.length >= 12 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setPage(page)}
              />
            </Box>
          )}
        </Grid>

        {Boolean(cart.length) && (
          <StickyBasket size={{ xs: 12, md: 3, lg: 2 }}>
            <Basket />
          </StickyBasket>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;

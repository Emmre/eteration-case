import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import axios from "axios";
import { Button, Container, Grid2, Typography } from "@mui/material";
import Basket from "@/components/Basket";
import { useCart } from "@/hooks/useCarts";
import { Product } from "@/types/productTypes";
import {
  ContentContainer,
  ImageContainer,
  StyledPaper,
} from "@/styles/GlobalStyles";
import { fetchProductById } from "@/services/productService";

interface IProps {
  product: Product;
}

const ProductDetail: FC<IProps> = ({ product }) => {
  const { cart, addProductToCart } = useCart();

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size="grow">
          <StyledPaper elevation={3}>
            <ImageContainer>
              <img src={product.image} alt={product.name} />
            </ImageContainer>

            <ContentContainer>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {product.price} TL
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => addProductToCart(product)}
              >
                Add to Cart
              </Button>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {product.description}
              </Typography>
            </ContentContainer>
          </StyledPaper>
        </Grid2>
        {Boolean(cart.length) && (
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Basket />
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  try {
    const product = await fetchProductById(id);

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}

export default ProductDetail;

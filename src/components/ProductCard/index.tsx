import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/productTypes";
import { Button } from "@mui/material";
import {
  CardStyled,
  ImageWrapperStyled,
  InfoStyled,
  PriceStyled,
  NameStyled,
} from "./styled";
import { useCart } from "@/hooks/useCarts";

interface IProps {
  product: Product;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const { addProductToCart } = useCart();

  return (
    <CardStyled>
      <Link href={`/product/${product.id}`} legacyBehavior>
        <a>
          <ImageWrapperStyled>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </ImageWrapperStyled>
          <InfoStyled>
            <PriceStyled>{product.price}₺</PriceStyled>
            <NameStyled>{product.name}</NameStyled>
            <NameStyled>{product.brand}</NameStyled>
            <NameStyled>{product.model}</NameStyled>
          </InfoStyled>
        </a>
      </Link>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addProductToCart(product)}
      >
        Add to Cart
      </Button>
    </CardStyled>
  );
};

export default ProductCard;

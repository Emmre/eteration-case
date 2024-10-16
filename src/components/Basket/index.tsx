import React from "react";
import { Button, Typography, ButtonGroup, useMediaQuery } from "@mui/material";
import { PaperStyled, BoxStyled, DetailStyled } from "./styled";
import { useCart } from "@/hooks/useCarts";
import Grid from "@mui/material/Grid2";

const Basket = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const { cart, updateProductQuantity, removeProductFromCart } = useCart();

  const handleIncreaseQuantity = (id: string) => {
    const selectedItem = cart.find((item) => item.id === id);
    if (selectedItem) {
      updateProductQuantity(id, selectedItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const selectedItem = cart.find((item) => item.id === id);
    if (selectedItem && selectedItem.quantity > 1) {
      updateProductQuantity(id, selectedItem.quantity - 1);
    }

    if (selectedItem?.quantity === 1) {
      removeProductFromCart(id);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <PaperStyled elevation={3}>
        {cart.map((item) => (
          <BoxStyled key={item.id}>
            <DetailStyled>
              <Typography variant="body1" maxWidth={100} minWidth={100}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="blue">
                {Number(item.price) * item.quantity} TL
              </Typography>
            </DetailStyled>

            <BoxStyled>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                <Button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </Button>
                <Button variant="contained">{item.quantity}</Button>
                <Button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </Button>
              </ButtonGroup>
            </BoxStyled>
          </BoxStyled>
        ))}
      </PaperStyled>
      <PaperStyled elevation={3} sx={{ mt: 2 }}>
        <Typography variant="h6">Total Price: {totalPrice} TL</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, width: "100%" }}
        >
          Checkout
        </Button>
      </PaperStyled>
    </>
  );
};

export default Basket;

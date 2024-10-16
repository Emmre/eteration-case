import React, { useState } from "react";
import {
  AppBar,
  Typography,
  IconButton,
  Badge,
  Container,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  SearchBoxStyled,
  SearchInputStyled,
  UserBoxStyled,
  ToolbarStyled,
  TypographyStyled,
} from "./styled";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCarts";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { search } = useProducts();
  const { cart } = useCart();
  const userName = "Emre";

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    search(value);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <ToolbarStyled>
          <TypographyStyled onClick={() => router.push("/")}>
            Eteration
          </TypographyStyled>

          <SearchBoxStyled>
            <SearchInputStyled
              placeholder="Search…"
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
            />
          </SearchBoxStyled>

          <UserBoxStyled>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <AccountCircle />
            <Typography variant="subtitle1">{userName}</Typography>
          </UserBoxStyled>
        </ToolbarStyled>
      </Container>
    </AppBar>
  );
};

export default Header;

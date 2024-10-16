import { Grid2, Paper , Box} from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { styled } from "@mui/material/styles";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul {
    list-style: none;
  }
`;

export const StickyFilters = styled(Grid2)(({ theme }) => ({
  position: "sticky",
  top: 0,
  height: "100vh",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    position: "static",
    height: "auto",
  },
}));

export const StickyBasket = styled(Grid2)(({ theme }) => ({
  position: "sticky",
  top: 0,
  height: "100vh",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    position: "static",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export const ContentStyled = styled("div")`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  padding: 0 20px;
`;

export const StyledPaper = styled(Paper)`
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 20px;
`;

export const ImageContainer = styled(Box)`
  width: 300px;
  height: 300px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentContainer = styled(Box)`
  flex: 1;
`;

export default GlobalStyle;

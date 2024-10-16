import styled from "styled-components";
import { Box, TextField, Toolbar, Typography } from "@mui/material";

export const SearchBoxStyled = styled(Box)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const SearchInputStyled = styled(TextField)`
  max-width: 500px;
  width: 100%;
  background-color: white;
`;

export const UserBoxStyled = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const ToolbarStyled = styled(Toolbar)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 !important;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const TypographyStyled = styled(Typography)`
  &:hover {
    cursor: pointer;
  }
`;

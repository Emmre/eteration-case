import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));

export const DetailStyled = styled(Box)(({ theme }) => ({}));

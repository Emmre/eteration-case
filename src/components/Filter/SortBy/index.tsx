import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useProducts } from "@/hooks/useProducts";
import { SortOption } from "@/types/productTypes";

const SortBy = () => {
  const { sortBy, sortValue } = useProducts();

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sortBy(event.target.value as SortOption);
  };

  return (
    <>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Sort By:
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <FormControl component="fieldset">
            <RadioGroup onChange={handleSortChange} value={sortValue}>
              <FormControlLabel
                value="oldToNew"
                control={<Radio />}
                label="Old to New"
              />
              <FormControlLabel
                value="newToOld"
                control={<Radio />}
                label="New to Old"
              />
              <FormControlLabel
                value="priceHighToLow"
                control={<Radio />}
                label="Price High to Low"
              />
              <FormControlLabel
                value="priceLowToHigh"
                control={<Radio />}
                label="Price Low to High"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default SortBy;

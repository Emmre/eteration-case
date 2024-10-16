import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useProducts } from "@/hooks/useProducts";

const Brands = () => {
  const { filteredBrands, filterByBrand } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  useEffect(() => {
    filterByBrand(selectedBrands.length > 0 ? selectedBrands : []);
  }, [selectedBrands, filterByBrand]);

  const sortedBrands = filteredBrands
    .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const isASelected = selectedBrands.includes(a);
      const isBSelected = selectedBrands.includes(b);
      if (isASelected && !isBSelected) return -1;
      if (!isASelected && isBSelected) return 1;
      return 0;
    });

  return (
    <>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Brands:
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            sx={{ mb: 2 }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div
            style={{
              maxHeight: 200,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {sortedBrands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Brands;

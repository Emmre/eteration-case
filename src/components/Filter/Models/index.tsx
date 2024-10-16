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

const Models = () => {
  const { filteredModels, filterByModel } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleModelChange = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  useEffect(() => {
    filterByModel(selectedModels.length > 0 ? selectedModels : []);
  }, [selectedModels, filterByModel]);

  const sortedModels = filteredModels
    .filter((model) => model.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const isASelected = selectedModels.includes(a);
      const isBSelected = selectedModels.includes(b);
      if (isASelected && !isBSelected) return -1;
      if (!isASelected && isBSelected) return 1;
      return 0;
    });

  return (
    <>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Model:
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            variant="outlined"
            placeholder="Search models..."
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
            {sortedModels.map((model) => (
              <FormControlLabel
                key={model}
                control={
                  <Checkbox
                    checked={selectedModels.includes(model)}
                    onChange={() => handleModelChange(model)}
                  />
                }
                label={model}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Models;

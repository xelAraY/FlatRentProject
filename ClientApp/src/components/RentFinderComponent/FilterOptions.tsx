import { Paper, Stack } from "@mui/material";
import React from "react";
import { RoomsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/RoomsSelect";
import { LocationsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/LocationSelect";
import { PriceComponent } from "../HomeComponent/NavMenuComponent/SearchComponent/PriceComponent";
import { FilterState } from "src/interfaces/SearchInterfaces";

interface FilterOptionsProps {
  filters: {
    rooms: string[];
    locations: string[];
    minPrice: number;
    maxPrice: number;
    currentCurrency: string;
  };
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
}

export const FilterOptions = ({ filters, onFiltersChange }: FilterOptionsProps) => {
  return (
    <Paper elevation={3}>
      <Stack direction={"row"} style={{ backgroundColor: "white", borderTop: "1px solid #f0f1f2", padding: "1rem" }}>
        <RoomsSelect
          rooms={filters.rooms}
          onFiltersChange={onFiltersChange}
        />
        <LocationsSelect
          locations={filters.locations}
          onFiltersChange={onFiltersChange}
        />
        <PriceComponent
          price={{ min: filters.minPrice, max: filters.maxPrice }}
          currentCurrency={filters.currentCurrency}
          onFiltersChange={onFiltersChange}
          isHome={false}
        />
      </Stack>
    </Paper>
  );
}
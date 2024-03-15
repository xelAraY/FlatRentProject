import { Paper, Stack } from "@mui/material";
import React from "react";
import { RoomsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/RoomsSelect";
import { LocationsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/LocationSelect";
import { PriceComponent } from "../HomeComponent/NavMenuComponent/SearchComponent/PriceComponent";
import { FilterOptionsProps } from "src/interfaces/SearchInterfaces";
import { AdditionalFilters } from "./AdditionalFilters";

export const FilterOptions = ({ filters, onFiltersChange }: FilterOptionsProps) => {
  return (
    <Paper elevation={3}>
      <Stack direction={"row"} style={{ backgroundColor: "white", borderTop: "1px solid #f0f1f2", padding: "1rem" }} alignItems={"center"} justifyContent={"center"}>
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
        <AdditionalFilters />
      </Stack>
    </Paper>
  );
}
import { Stack } from "@mui/material";
import React from "react";
import { PriceComponent } from "./PriceComponent";
import { RoomsSelect } from "./RoomsSelect";
import { SearchProps } from "src/interfaces/SearchInterfaces";
import { LocationsSelect } from "./LocationSelect";

export const SearchParams = ({ priceProps, roomsProps, locationsProps }: SearchProps) => {
  return (
    <Stack flexDirection="row">
      <RoomsSelect
        rooms={roomsProps.rooms}
        onFiltersChange={roomsProps.onFiltersChange}
      />
      <LocationsSelect
        locations={locationsProps.locations}
        onFiltersChange={locationsProps.onFiltersChange}
      />
      <PriceComponent
        price={priceProps.price}
        currentCurrency={priceProps.currentCurrency}
        onFiltersChange={priceProps.onFiltersChange}
        isHome={priceProps.isHome} />
    </Stack>
  );
}
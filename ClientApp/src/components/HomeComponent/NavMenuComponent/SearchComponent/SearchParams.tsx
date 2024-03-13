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
        setRooms={roomsProps.setRooms}
      />
      <LocationsSelect
        locations={locationsProps.locations}
        setLocations={locationsProps.setLocations}
      />
      <PriceComponent
        price={priceProps.price}
        setMinPrice={priceProps.setMinPrice}
        setMaxPrice={priceProps.setMaxPrice}
        currentCurrency={priceProps.currentCurrency}
        setCurrentCurrency={priceProps.setCurrentCurrency} />
    </Stack>
  );
}
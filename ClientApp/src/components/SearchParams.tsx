import { Stack } from "@mui/material";
import React from "react";
import { PriceComponent } from "./HomeComponent/NavMenuComponent/PriceComponent";
import { RoomsSelect } from "./RoomsSelect";
import { SearchProps } from "src/interfaces/SearchInterfaces";

export const SearchParams = ({ priceProps, roomsProps }: SearchProps) => {
  return (
    <Stack flexDirection="row">
      <RoomsSelect
        rooms={roomsProps.rooms}
        setRooms={roomsProps.setRooms}
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
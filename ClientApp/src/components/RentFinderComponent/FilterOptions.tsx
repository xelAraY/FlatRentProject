import { Paper, Stack } from "@mui/material";
import React from "react";
import { RoomsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/RoomsSelect";
import { LocationsSelect } from "../HomeComponent/NavMenuComponent/SearchComponent/LocationSelect";
import { PriceComponent } from "../HomeComponent/NavMenuComponent/SearchComponent/PriceComponent";
import { FilterOptionsProps } from "src/interfaces/SearchInterfaces";
import { AdditionalFilters } from "./AdditionalFilters";
import { useLocation } from "react-router-dom";

export const FilterOptions = ({ count, path }: FilterOptionsProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const numberOfRooms = queryParams.get("numberOfRooms")?.split(",");
  const locations = queryParams.get("locations")?.split(",");

  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const currencyType = queryParams.get("currencyType");

  const floorFrom = queryParams.get("floorFrom");
  const floorTo = queryParams.get("floorTo");

  const totalAreaFrom = queryParams.get("totalAreaFrom");
  const totalAreaTo = queryParams.get("totalAreaTo");

  const livingAreaFrom = queryParams.get("livingAreaFrom");
  const livingAreaTo = queryParams.get("livingAreaTo");

  const kitchenAreaFrom = queryParams.get("kitchenAreaFrom");
  const kitchenAreaTo = queryParams.get("kitchenAreaTo");

  const bathroomType = queryParams.get("bathroomType")?.split(",");
  const balconyType = queryParams.get("balconyType")?.split(",");

  const appliances = queryParams.get("appliances")?.split(",");
  const preferences = queryParams.get("preferences")?.split(",");
  const prepayment = queryParams.get("prepayment")?.split(",");

  const rentalPeriod = queryParams.get("rentalPeriod");
  const furniture = queryParams.get("furniture");
  const photos = queryParams.get("photos");

  return (
    <Paper elevation={3}>
      <Stack
        direction={"row"}
        style={{
          backgroundColor: "white",
          borderTop: "1px solid #f0f1f2",
          padding: "1rem",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <RoomsSelect rooms={numberOfRooms || []} />
        <LocationsSelect locations={locations || []} />
        <PriceComponent
          price={{
            min: minPrice ? Number(minPrice) : 0,
            max: maxPrice ? Number(maxPrice) : 0,
          }}
          currentCurrency={currencyType || "BYN"}
          isHome={false}
        />
        <AdditionalFilters
          additionalFilters={{
            floor: {
              valueFrom: floorFrom ? Number(floorFrom) : null,
              valueTo: floorTo ? Number(floorTo) : null,
            },
            totalArea: {
              valueFrom: totalAreaFrom ? Number(totalAreaFrom) : null,
              valueTo: totalAreaTo ? Number(totalAreaTo) : null,
            },
            livingArea: {
              valueFrom: livingAreaFrom ? Number(livingAreaFrom) : null,
              valueTo: livingAreaTo ? Number(livingAreaTo) : null,
            },
            kitchenArea: {
              valueFrom: kitchenAreaFrom ? Number(kitchenAreaFrom) : null,
              valueTo: kitchenAreaTo ? Number(kitchenAreaTo) : null,
            },
            bathroom: bathroomType ? bathroomType : [],
            balcony: balconyType ? balconyType : [],
            appliances: appliances || [],
            rentalPeriod: rentalPeriod || "",
            preferences: preferences || [],
            prepayment: prepayment || [],
            furniture: !!furniture,
            withPhotos: !!photos,
          }}
          count={count}
          path={path}
        />
      </Stack>
    </Paper>
  );
};

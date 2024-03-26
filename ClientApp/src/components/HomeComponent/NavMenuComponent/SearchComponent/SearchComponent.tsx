import { Stack, Typography } from "@mui/material";
import { Button } from "src/shared";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { NavLink } from "react-router-dom";
import { SearchParams } from "src/components/HomeComponent/NavMenuComponent/SearchComponent/SearchParams";
import { useState } from "react";
import { FilterState } from "src/interfaces/SearchInterfaces";

export const SearchComponent = () => {
  const [filters, setFilters] = useState<FilterState>({
    rooms: [],
    locations: [],
    minPrice: 0,
    maxPrice: 0,
    currentCurrency: "BYN",
    floor: { valueFrom: null, valueTo: null },
    totalArea: { valueFrom: null, valueTo: null },
    livingArea: { valueFrom: null, valueTo: null },
    kitchenArea: { valueFrom: null, valueTo: null },
    bathroom: [],
    balcony: [],
    appliances: [],
    rentalPeriod: "",
    preferences: [],
    prepayment: [],
    furniture: true,
    withPhotos: true,
    showData: true,
  });

  const paramsArray = [];
  filters.rooms.length > 0 &&
    paramsArray.push(`numberOfRooms=${filters.rooms.join(",")}`);
  filters.locations.length > 0 &&
    paramsArray.push(`locations=${filters.locations.join(",")}`);
  if (filters.minPrice > filters.maxPrice) {
    paramsArray.push(`minPrice=${filters.minPrice}`);
    paramsArray.push(`currencyType=${filters.currentCurrency}`);
    filters.maxPrice = 0;
  } else {
    if (filters.minPrice !== 0 && filters.maxPrice !== 0) {
      paramsArray.push(`maxPrice=${filters.maxPrice}`);
      paramsArray.push(`minPrice=${filters.minPrice}`);
      paramsArray.push(`currencyType=${filters.currentCurrency}`);
    } else {
      if (filters.minPrice === 0 && filters.maxPrice !== 0) {
        paramsArray.push(`maxPrice=${filters.maxPrice}`);
        paramsArray.push(`currencyType=${filters.currentCurrency}`);
      }
      if (filters.maxPrice === 0 && filters.minPrice !== 0) {
        paramsArray.push(`minPrice=${filters.minPrice}`);
        paramsArray.push(`currencyType=${filters.currentCurrency}`);
      }
    }
  }

  const queryParams = paramsArray.join("&");

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        height: "200px",
      }}
    >
      <Stack flexDirection="column" spacing={1}>
        <SearchParams
          priceProps={{
            price: { min: filters.minPrice, max: filters.maxPrice },
            currentCurrency: filters.currentCurrency,
            onFiltersChange: handleFiltersChange,
            isHome: true,
          }}
          roomsProps={{
            rooms: filters.rooms,
            onFiltersChange: handleFiltersChange,
          }}
          locationsProps={{
            locations: filters.locations,
            onFiltersChange: handleFiltersChange,
          }}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <NavLink to={"/rental-search/flats"}>
            <Button
              variant="outlined"
              style={{
                marginLeft: "6px",
                width: "max-content",
                color: "#0a0f1c",
                borderColor: "#afafae",
              }}
            >
              <ZoomInIcon />
              <Typography fontSize="17px" marginLeft="3px">
                Расширенный поиск
              </Typography>
            </Button>
          </NavLink>
          <NavLink to={`/rental-search/flats?${queryParams}`}>
            <Button
              variant="contained"
              style={{ marginRight: "6px", fontSize: "17px" }}
            >
              Найти
            </Button>
          </NavLink>
        </Stack>
      </Stack>
    </div>
  );
};

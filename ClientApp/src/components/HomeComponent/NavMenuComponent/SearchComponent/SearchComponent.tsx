import {
  Stack,
  Typography,
} from "@mui/material";
import { Button } from "src/shared";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { NavLink } from "react-router-dom";
import { SearchParams } from "src/components/HomeComponent/NavMenuComponent/SearchComponent/SearchParams";
import { useState } from "react";

export const SearchComponent = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [currentCurrency, setCurrentCurrency] = useState("BYN");

  const paramsArray = [];
  rooms.length > 0 && paramsArray.push(`NumberofRooms=${rooms.join(',')}`);
  locations.length > 0 && paramsArray.push(`Locations=${locations.join(',')}`);
  const queryParams = paramsArray.join('&');

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
            price: { min: minPrice, max: maxPrice },
            setMinPrice,
            setMaxPrice,
            currentCurrency,
            setCurrentCurrency
          }}
          roomsProps={{
            rooms,
            setRooms
          }}
          locationsProps={{
            locations,
            setLocations
          }}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <NavLink to={"/rental-search/flats"}>
            <Button variant="outlined" style={{ marginLeft: "6px", width: "max-content", color: "#0a0f1c", borderColor: "#afafae" }}>
              <ZoomInIcon />
              <Typography fontSize="17px" marginLeft="3px">Расширенный поиск</Typography>
            </Button>
          </NavLink>
          <NavLink to={`/rental-search/flats?${queryParams}`}>
            <Button variant="contained" style={{ marginRight: "6px", width: "max-content", color: "#0a0f1c", backgroundColor: "#efcd6c" }}>
              <Typography fontSize="17px" marginLeft="3px">Найти</Typography>
            </Button>
          </NavLink>
        </Stack>

      </Stack>
    </div>
  );
};

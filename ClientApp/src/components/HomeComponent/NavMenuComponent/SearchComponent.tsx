import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { PriceComponent } from "./PriceComponent";

export const SearchComponent = () => {
  const [type, setType] = useState("");
  const [roomsCount, setRoomsCount] = useState("");

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleRoomsCountChange = (event: SelectChangeEvent) => {
    setRoomsCount(event.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        height: "200px",
      }}
    >
      <Stack flexDirection="row">
        <FormControl sx={{ m: 1, minWidth: 130 }} variant="filled">
          <InputLabel>Тип</InputLabel>
          <Select
            value={type}
            onChange={handleTypeChange}
            autoWidth
            label="Type"
          >
            <MenuItem value="flat">Квартира</MenuItem>
            <MenuItem value="house">Дом</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }} variant="filled">
          <InputLabel>Количество комнат</InputLabel>
          <Select
            value={roomsCount}
            onChange={handleRoomsCountChange}
            autoWidth
            label="RoomsCount"
          >
            <MenuItem value="1">1к квартира</MenuItem>
            <MenuItem value="2">2к квартира</MenuItem>
            <MenuItem value="3">3к квартира</MenuItem>
            <MenuItem value="4">4к квартира</MenuItem>
            <MenuItem value="5">5к квартира</MenuItem>
          </Select>
        </FormControl>
        <PriceComponent />
      </Stack>
    </div>
  );
};

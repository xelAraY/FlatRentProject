import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import React, { useState } from "react";
import { PriceComponent } from "./HomeComponent/NavMenuComponent/PriceComponent";

export const SearchParams = () => {
  const [type, setType] = useState("");
  const [roomsCount, setRoomsCount] = useState("");

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleRoomsCountChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setRoomsCount(event.target.value);
  };

  return (
    <Stack flexDirection="row">
      <FormControl sx={{ m: 1, minWidth: 130 }} variant="outlined">
        <InputLabel>Тип</InputLabel>
        <Select
          value={type}
          onChange={handleTypeChange}
          autoWidth
          label="Type"

        >
          <MenuItem value="квартира">Квартира</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 300 }} variant="outlined">
        <InputLabel>Комнат</InputLabel>
        <Select
          value={roomsCount}
          onChange={handleRoomsCountChange}
          autoWidth
          label="RoomsCount"
          MenuProps={{
            PaperProps: {
              style: {
                width: '300px'
              }
            },
            MenuListProps: {
              sx: {
                display: 'flex',
                flexWrap: 'wrap'
              },
            }
          }}
        >
          <>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="5">6+</MenuItem>
          </>
        </Select>
      </FormControl>
      <PriceComponent />
    </Stack>
  );
}
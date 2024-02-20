import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { PriceComponent } from "./PriceComponent";
import { Button } from "src/shared";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import "./NavMenu.css";

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
      <Stack flexDirection="column" spacing={1}>
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
        <Stack flexDirection="row" justifyContent="space-between">
          <Button variant="outlined" style={{marginLeft: "6px", width: "max-content", color: "#0a0f1c", borderColor: "#afafae"}}>
            <ZoomInIcon/>
            <Typography fontSize="17px" marginLeft="3px">Расширенный поиск</Typography> 
          </Button>
          <Button variant="contained" style={{marginRight: "6px", width: "max-content", color: "#0a0f1c", backgroundColor: "#efcd6c"}}>
            <Typography fontSize="17px" marginLeft="3px">Найти</Typography> 
          </Button>
        </Stack>
        
      </Stack>
    </div>
  );
};

import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import React from "react";
import { PopoverComponent } from "./PopoverComponent";

export const PriceComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLDivElement | HTMLButtonElement | null
  >(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: "25ch" }}
        variant="filled"
        aria-describedby={id}
      >
        <InputLabel htmlFor="filled-adornment-password">Цена</InputLabel>
        <FilledInput
          onClick={handleClick}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClick} edge="end">
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ marginTop: 5 }}
      >
        <PopoverComponent price={{ min: minPrice, max: maxPrice }} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </Popover>
    </div>
  );
};

import {
  FormControl
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "@mui/material/Popover";
import React from "react";
import { PopoverComponent } from "./PopoverComponent";
import { Button } from "src/shared";
import { PriceProps } from "src/interfaces/SearchInterfaces";

export const PriceComponent = ({ price, setMinPrice, setMaxPrice, currentCurrency, setCurrentCurrency }: PriceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLDivElement | HTMLButtonElement | null
  >(null);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
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
        {/* <InputLabel htmlFor="filled-adornment-password">Цена</InputLabel> */}
        {/* <OutlinedInput
          disabled
          onClick={handleClick}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClick} edge="end">
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </InputAdornment>
          }
        /> */}
        <Button variant="outlined" size="large" color='info' onClick={handleClick} style={{ color: 'rgba(0, 0, 0, 0.87)', border: '1px solid rgba(0, 0, 0, 0.23)', justifyContent: "space-between", height: "56px" }} endIcon={open ? <ArrowDropUpIcon style={{ color: "#747473" }} /> : <ArrowDropDownIcon style={{ color: "#747473" }} />}>Цена</Button>
      </FormControl >
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
        <PopoverComponent
          price={price}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          currentCurrency={currentCurrency}
          setCurrentCurrency={setCurrentCurrency} />
      </Popover>
    </div >
  );
};

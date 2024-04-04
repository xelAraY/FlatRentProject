import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { RentObjectInformation } from "src/interfaces/RentObj";
import { MapListPreviewCard } from "./MapListPreviewCard";

const drawerWidth = 690;

interface FlatsListProps {
  onListSwitch: (isOpen: boolean) => void;
  onFavouriteChange: (isChanged: boolean) => void;
  favourites: number[];
  flatsCount: number;
  isOpen: boolean;
  rentObjects: RentObjectInformation[];
}

export default function FlatsList({
  onListSwitch,
  onFavouriteChange,
  favourites,
  flatsCount,
  isOpen,
  rentObjects,
}: FlatsListProps) {
  const handleDrawerSwitch = () => {
    onListSwitch(!isOpen);
  };

  const ending =
    flatsCount === 1 ? "е" : flatsCount > 1 && flatsCount < 5 ? "я" : "й";

  return (
    <Box
      sx={{
        zIndex: 9999,
        position: "absolute",
        height: "-webkit-fill-available",
      }}
    >
      <Box sx={{ position: "absolute", top: "45%" }}>
        <IconButton
          onClick={handleDrawerSwitch}
          edge="start"
          style={{
            height: "90px",
            width: "44px",
            borderRadius: "0 10px 10px 0",
            backgroundColor: "#1976d2",
            marginLeft: "0",
            transform: isOpen ? "translateX(690px)" : "translateX(0)",
            transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          }}
          size="large"
        >
          {isOpen ? (
            <KeyboardDoubleArrowLeftIcon
              fontSize="large"
              style={{ color: "white" }}
            />
          ) : (
            <KeyboardDoubleArrowRightIcon
              fontSize="large"
              style={{ color: "white" }}
            />
          )}
        </IconButton>
      </Box>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "absolute",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <Stack>
          <Typography
            fontSize={32}
            fontWeight={700}
            marginBottom="14px"
            padding="0 20px"
          >
            Аренда квартир на карте в Беларуси
          </Typography>
          <Stack flexDirection={"row"} padding="0 20px">
            <Typography variant="body1">
              <b>{flatsCount}</b> объявлени{ending}
            </Typography>
            <div
              style={{
                height: "1.5rem",
                width: "1px",
                backgroundColor: "rgb(210 214 219)",
                margin: "0 16px",
              }}
            />
            <NavLink to={`/flats`} style={{ textDecoration: "none" }}>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <FormatListBulletedIcon
                  style={{ marginRight: "6px" }}
                  fontSize="medium"
                />
                <Typography fontSize={16} fontWeight={600}>
                  Список
                </Typography>
              </Stack>
            </NavLink>
          </Stack>
          <Stack>
            {rentObjects.map((rentObject, index) => (
              <MapListPreviewCard
                rentInformation={rentObject}
                keyNumber={index}
                isFavourite={favourites.includes(
                  rentObject.rentObject.rentObjId
                )}
                onFavouriteChange={onFavouriteChange}
              />
            ))}
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
}

import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const [myRentOpen, setMyRentOpen] = useState(false);
  const navigate = useNavigate();

  const commonStyle = {
    width: "100%",
    borderRadius: "15px",
    justifyContent: "start",
    fontSize: "20px",
  };

  const handleExitClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Paper elevation={3} style={{ height: "100%" }}>
      <Stack padding={2} spacing={2}>
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={() => navigate("/account/profile")}
        >
          <PersonIcon style={{ marginRight: "10px" }} />
          Профиль
        </IconButton>
        <Stack>
          <IconButton
            color="primary"
            style={commonStyle}
            onClick={() => navigate("/account/myListings")}
          >
            <ApartmentIcon style={{ marginRight: "10px" }} />
            Мои объявления
          </IconButton>
          {myRentOpen && (
            <Stack>
              <Typography>Квартиры продажа</Typography>
              <Typography>Квартиры аренда</Typography>
            </Stack>
          )}
        </Stack>
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={() => navigate("/account/newListing")}
        >
          <AddIcon style={{ marginRight: "10px" }} />
          Добавить объявление
        </IconButton>
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={() => navigate("/account/favourites")}
        >
          <FavoriteIcon style={{ marginRight: "10px" }} />
          Избранное
        </IconButton>
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={handleExitClick}
        >
          <ExitToAppIcon style={{ marginRight: "10px" }} />
          Выйти
        </IconButton>
        <IconButton color="primary" style={commonStyle}>
          <DeleteForeverIcon style={{ marginRight: "10px" }} />
          Удалить аккаунт
        </IconButton>
      </Stack>
    </Paper>
  );
};

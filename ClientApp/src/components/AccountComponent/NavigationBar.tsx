import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import LockResetIcon from "@mui/icons-material/LockReset";
import BalanceIcon from "@mui/icons-material/Balance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "src/shared";

export const NavigationBar = () => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

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

  const handleDeleteAccount = async () => {
    handleCloseDeleteAlert();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      await fetch(`api/account/deleteUser/${decodedToken.nickname}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();
      // if (response.ok) {
      //   console.log("Успешное удаление данных ", data);
      // } else {
      //   console.error("Ошибка при получении данных ", data);
      // }
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  return (
    <Paper elevation={3} sx={{ position: "sticky", top: "1rem" }}>
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
          onClick={() => navigate("/account/comparisons")}
        >
          <BalanceIcon style={{ marginRight: "10px" }} />
          Сравнения
        </IconButton>
        {/* <IconButton
          color="primary"
          style={commonStyle}
          onClick={() => navigate("/account/password")}
        >
          <LockResetIcon style={{ marginRight: "10px" }} />
          Сменить пароль
        </IconButton> */}
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={handleExitClick}
        >
          <ExitToAppIcon style={{ marginRight: "10px" }} />
          Выйти
        </IconButton>
        <IconButton
          color="primary"
          style={commonStyle}
          onClick={handleOpenDeleteAlert}
        >
          <DeleteForeverIcon style={{ marginRight: "10px" }} />
          Удалить аккаунт
        </IconButton>
        <Dialog open={openDeleteAlert} onClose={handleCloseDeleteAlert}>
          <DialogTitle>
            {"Вы действительно хотите удалить свой аккаунт?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Полное удаление аккаунта приведет к безвозвратной потере всех
              связанных с ним данных, включая все объявления, размещенные на
              сайте через этот аккаунт.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteAlert}>Отмена</Button>
            <Button onClick={handleDeleteAccount} autoFocus>
              Продолжить
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
};

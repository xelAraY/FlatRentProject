import React from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { Stack } from "@mui/material";
import { NavMenuImage } from "./NavMenuImage";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "src/shared";

export const NavMenu = () => {
  return (
    <header>
      <div className="nav-menu">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack alignItems="flex-start">
            <NavLink to="/" className="nav-menu-name">
              FlatRent
            </NavLink>
          </Stack>
          <Stack flexDirection="row" alignItems="center" spacing={3} useFlexGap>
            <NavLink to="/sign-in" className="nav-menu-link">
              Войти
            </NavLink>
            <NavLink to="/sign-up" className="nav-menu-link">
              Зарегистрироваться
            </NavLink>
            <Button variant="contained" style={{ backgroundColor: "#efcd6c" }}>
              <AddIcon
                style={{ color: "#0a0f1c", marginRight: "5px" }}
                sx={{ fontSize: 30 }}
              />
              <NavLink to="/new" className="nav-menu-add-link">
                Добавить объявление
              </NavLink>
            </Button>
          </Stack>
        </Stack>
      </div>
      <NavMenuImage />
    </header>
  );
};

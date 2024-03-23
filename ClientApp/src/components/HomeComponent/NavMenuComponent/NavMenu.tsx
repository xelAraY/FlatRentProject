import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { Avatar, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "src/shared";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import PersonIcon from "@mui/icons-material/Person";

export const NavMenu = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("token = ", localStorage.getItem("token"));
    setIsLogged(!isLogged);
  };

  useEffect(() => {
    setIsLogged(isLoggedIn);
  }, []);

  const addNewPage = isLogged ? "/new" : "/sign-in";

  return (
    <header>
      <div className="nav-menu">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack alignItems="flex-start">
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              <Stack direction="row" alignItems="flex-end" mt={-0.8}>
                <img
                  src="./../../../../FIcon.png"
                  style={{ width: "50px", height: "50px" }}
                  alt="Icon of website"
                />
                <Typography
                  variant="h4"
                  style={{ marginLeft: "-10px" }}
                  lineHeight={1}
                >
                  latRent
                </Typography>
              </Stack>
            </NavLink>
          </Stack>
          <Stack flexDirection="row" alignItems="center" spacing={3} useFlexGap>
            {isLogged ? (
              <Stack
                flexDirection="row"
                spacing={2}
                useFlexGap
                alignItems="center"
              >
                <Avatar className="avatar-image">
                  <PersonIcon />
                </Avatar>
                <NavLink
                  to="/"
                  className="nav-menu-link"
                  onClick={handleLogout}
                >
                  Выйти
                </NavLink>
              </Stack>
            ) : (
              <Stack flexDirection="row" spacing={2} useFlexGap>
                <NavLink to="/sign-in" className="nav-menu-link">
                  Войти
                </NavLink>
                <NavLink to="/sign-up" className="nav-menu-link">
                  Зарегистрироваться
                </NavLink>
              </Stack>
            )}

            <Button
              variant="contained"
              color="secondary"
              // style={{ backgroundColor: "#efcd6c" }}
            >
              <AddIcon style={{ marginRight: "5px" }} sx={{ fontSize: 30 }} />
              <NavLink to={addNewPage} className="nav-menu-add-link">
                Добавить объявление
              </NavLink>
            </Button>
          </Stack>
        </Stack>
      </div>
    </header>
  );
};

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "src/shared";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const NavMenu = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [isLoggedIn()]);

  const addNewPage = isLoggedIn() ? "/new" : "/sign-in";

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
                spacing={3}
                useFlexGap
                alignItems="center"
              >
                <NavLink
                  to={"/account/favourites"}
                  style={{ textDecoration: "none" }}
                >
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    spacing={1}
                    useFlexGap
                  >
                    <FavoriteIcon fontSize="large" />
                    <Typography>Избранное</Typography>
                  </Stack>
                </NavLink>
                <NavLink to={"/account"} style={{ textDecoration: "none" }}>
                  {/* <Avatar className="avatar-image"> */}
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    spacing={1}
                    useFlexGap
                  >
                    <PersonIcon fontSize="large" />
                    <Typography>Профиль</Typography>
                  </Stack>
                  {/* </Avatar> */}
                </NavLink>
              </Stack>
            ) : (
              <Stack flexDirection="row" spacing={2} useFlexGap>
                {/* <NavLink to="/sign-in" className="nav-menu-link">
                  Войти
                </NavLink> */}
                <NavLink to="/sign-in" className="shine-button">
                  Войти
                </NavLink>
                <NavLink to="/sign-up" className="shine-button">
                  Зарегистрироваться
                </NavLink>
              </Stack>
            )}

            <Button
              variant="contained"
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

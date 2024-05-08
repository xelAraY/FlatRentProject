import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavMenu.css";
import { Avatar, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "src/shared";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { jwtDecode } from "jwt-decode";

export const NavMenu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [isLoggedIn()]);

  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);

        fetch(`api/account/getAvatarImage/${decodedToken.nickname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to fetch avatar data: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            setAvatarUrl(data.avatarImageUrl);
          })
          .catch((error) => {
            console.error("Error fetching avatar data:", error);
          });
      }
    }
  }, []);

  const addNewPage = isLoggedIn() ? "/account/newListing" : "/sign-in";

  // const handleAddListing = async () => {
  //   await fetch(`api/account/addNewListing/`, {
  //     method: "POST",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to add: ${response.status} ${response.statusText}`
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding new data:", error);
  //     });
  // };

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
                    <Avatar
                      style={{ backgroundColor: "#0366d6" }}
                      src={avatarUrl}
                    />
                    <Typography>Профиль</Typography>
                  </Stack>
                </NavLink>
              </Stack>
            ) : (
              <Stack flexDirection="row" spacing={2} useFlexGap>
                {/* <NavLink to="/sign-in" className="nav-menu-link">
                  Войти
                </NavLink> */}
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  // style={{ backgroundColor: "#efcd6c" }}
                >
                  <NavLink to="/sign-in" className="nav-menu-add-link">
                    Войти
                  </NavLink>
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAddAltIcon />}
                  // style={{ backgroundColor: "#efcd6c" }}
                >
                  <NavLink to="/sign-up" className="nav-menu-add-link">
                    Зарегистрироваться
                  </NavLink>
                </Button>
              </Stack>
            )}

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              // style={{ backgroundColor: "#efcd6c" }}
            >
              <NavLink
                to={addNewPage}
                className="nav-menu-add-link"
                // onClick={handleAddListing}
              >
                Добавить объявление
              </NavLink>
            </Button>
          </Stack>
        </Stack>
      </div>
    </header>
  );
};

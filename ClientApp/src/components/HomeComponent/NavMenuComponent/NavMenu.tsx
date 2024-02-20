import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";
import { Avatar, Stack, Typography } from "@mui/material";
import { NavMenuImage } from "./NavMenuImage";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "src/shared";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import PersonIcon from '@mui/icons-material/Person';

export const NavMenu = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("token = ", localStorage.getItem('token'));
    setIsLogged(!isLogged);
  }

  useEffect(() => {
    setIsLogged(isLoggedIn);  
  }, []);

  return (
    <header>
      <div className="nav-menu">
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack alignItems="flex-start">
          <NavLink to="/" style={{textDecoration: "none", color: "black"}}>
            <Stack direction="row" alignItems='flex-end' mt={-0.8}>
              <img src="./../../../../FIcon.png" style={{ width: '50px', height: '50px' }}/>
              <Typography variant='h4' style={{ marginLeft: '-10px'}} lineHeight={1}>latRent</Typography>
            </Stack>
          </NavLink>
          </Stack>
          <Stack flexDirection="row" alignItems="center" spacing={3} useFlexGap>
            {isLogged ? (
              <Stack flexDirection="row" spacing={2} useFlexGap alignItems="center">
                <Avatar className="avatar-image">
                  <PersonIcon />
                </Avatar>
                <NavLink to="/" className="nav-menu-link" onClick={handleLogout}>
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

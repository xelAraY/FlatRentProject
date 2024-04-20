import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockResetIcon from "@mui/icons-material/LockReset";

export const NavigationTopBar = () => {
  const location = useLocation();

  const getLinkContent = (name: string) => {
    switch (name) {
      case "account":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <HomeIcon />
            <Typography>Дом</Typography>
          </Stack>
        );
      case "profile":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <PersonIcon />
            <Typography>Профиль</Typography>
          </Stack>
        );
      case "favourites":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <FavoriteIcon />
            <Typography>Избранное</Typography>
          </Stack>
        );
      case "newListing":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <DomainAddIcon />
            <Typography>Новое объявление</Typography>
          </Stack>
        );
      case "myListings":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <DashboardIcon />
            <Typography>Мои объявления</Typography>
          </Stack>
        );
      case "password":
        return (
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            spacing={"5px"}
            useFlexGap
          >
            <LockResetIcon />
            <Typography>Смена пароля</Typography>
          </Stack>
        );
    }
  };

  const words = location.pathname.split("/").filter((word) => word !== "");

  const linksInf = words.map((word, index) => ({
    word: word,
    path: `/${words.slice(0, index + 1).join("/")}`,
  }));

  const states = linksInf.map((inf, index) =>
    index !== linksInf.length - 1 ? (
      <Link underline="hover" key={index} color="inherit" href={inf.path}>
        {getLinkContent(inf.word)}
      </Link>
    ) : (
      getLinkContent(inf.word)
    )
  );

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {states}
      </Breadcrumbs>
    </Stack>
  );
};

import { Box, Grid, Paper } from "@mui/material";
import { NavigationBar } from "./NavigationBar";
import { NavigationTopBar } from "./NavigationTopBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { useEffect } from "react";

export enum ElementType {
  Home,
  Profile,
  MyListings,
  AddListing,
  FavouriteListings,
  Exit,
  DeleteForever,
}

export const AccountPage = () => {
  const navigate = useNavigate();

  const AccountRoutes = [
    {
      path: `/`,
      element: <HomePage />,
    },
    {
      path: `/profile`,
      element: <ProfilePage />,
    },
    {
      path: `/favourites`,
      element: <div>FavouriteListings</div>,
    },
    {
      path: `/myListings`,
      element: <div>MyListings</div>,
    },
    {
      path: `/newListing`,
      element: <div>AddListing</div>,
    },
  ];

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <NavigationBar />
        </Grid>
        <Grid item xs={8.5}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
              <NavigationTopBar />
            </Grid>
            <Grid item xs={12}>
              <Routes>
                {AccountRoutes.map((route, index) => {
                  const { element, path } = route;
                  return <Route key={index} path={path} element={element} />;
                })}
              </Routes>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

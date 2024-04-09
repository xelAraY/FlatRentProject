import { Box, Grid } from "@mui/material";
import { NavigationBar } from "./NavigationBar";
import { NavigationTopBar } from "./NavigationTopBar";
import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { AddListingPage } from "../AddListingPage";

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
      path: "/newListing",
      element: <AddListingPage />,
    },
  ];

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <NavigationBar />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
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

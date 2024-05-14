import { Box, Grid } from "@mui/material";
import { NavigationBar } from "./NavigationBar";
import { NavigationTopBar } from "./NavigationTopBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProfilePage } from "./Pages/ProfilePage";
import { HomePage } from "./Pages/HomePage";
import { useEffect } from "react";
import { AddFlatPageWrapper } from "../add-flat-page/add-flat-page-wrapper";
import { FavouritesListings } from "./Pages/FavouritesListings";
import { isLoggedIn } from "src/helpFunctions/tokenCheck";
import { PasswordPage } from "./Pages/PasswordPage";
import { PostedListings } from "./Pages/PostedListings";

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
      element: <FavouritesListings />,
    },
    {
      path: `/myListings`,
      element: <PostedListings />,
    },
    {
      path: `/newListing`,
      element: <AddFlatPageWrapper />,
    },
    {
      path: `/password`,
      element: <PasswordPage />,
    },
  ];

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <NavigationBar />
        </Grid>
        <Grid item xs={9.5}>
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

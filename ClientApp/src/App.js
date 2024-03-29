import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import { Footer } from "./components/FooterComponent/Footer";
import { NavMenu } from "./components/HomeComponent/NavMenuComponent/NavMenu";
import { ThemeProvider, createTheme } from "@mui/material";

export const App = () => {
  const location = useLocation();

  const showNavMenu =
    location.pathname !== "/sign-in" && location.pathname !== "/sign-up";
  const showFooter =
    location.pathname !== "/sign-in" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/flats/map";

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {},
      })}
    >
      <Routes>
        <Route
          element={
            <>
              {showNavMenu && <NavMenu />}
              <div style={{ flexGrow: 1, background: "#f3f5f7" }}>
                <Outlet />
              </div>
              {showFooter && <Footer />}
            </>
          }
        >
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

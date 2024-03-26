import React, { Component } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import { Footer } from "./components/FooterComponent/Footer";
import { NavMenu } from "./components/HomeComponent/NavMenuComponent/NavMenu";
import { ThemeProvider, createTheme } from "@mui/material";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <ThemeProvider
          theme={createTheme({
            palette: {},
          })}
        >
          <Routes>
            <Route
              element={
                <>
                  <NavMenu /> <Outlet />
                  <Footer />
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
      </div>
    );
  }
}

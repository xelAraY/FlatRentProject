import React, { Component } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import { Footer } from "./components/Footer";
import { NavMenu } from "./components/HomeComponent/NavMenuComponent/NavMenu";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Routes>
          <Route element={<><NavMenu /> <Outlet /><Footer /></>}>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Route>
        </Routes>
      </div>
    );
  }
}

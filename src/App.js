import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import Home from "./homepage/Home";

import "./index.css";
import InverterList from "./crudpages/InverterList";
import { GlobalProvider } from "./homepage/context/global-context";
import { HomeProvider } from "./homepage/context/home-context";
import { LOVProvider } from "./homepage/context/lov-context";
import BatteryList from "./crudpages/BatteryList";
import SolarPanelList from "./crudpages/SolarPanelList";
import SCCList from "./crudpages/SCCList";
import { useAuth } from "./shared/components/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/inverters" exact>
          <InverterList />
        </Route>
        <Route path="/batteries" exact>
          <BatteryList />
        </Route>
        <Route path="/solarpanels" exact>
          <SolarPanelList />
        </Route>
        <Route path="/sccs" exact>
          <SCCList />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <GlobalProvider>
        <HomeProvider>
          <LOVProvider>
            <Router>
              <MainNavigation />
              <main>{routes}</main>
            </Router>
          </LOVProvider>
        </HomeProvider>
      </GlobalProvider>
    </AuthContext.Provider>
  );
};

export default App;

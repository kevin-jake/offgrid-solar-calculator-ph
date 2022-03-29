import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./shared/components/hooks/auth-hook";
import { AuthContext } from "./shared/context/auth-context";
import { GlobalProvider } from "./homepage/context/global-context";
import { HomeProvider } from "./homepage/context/home-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import "./index.css";

// import Home from "./homepage/Home";
// import Auth from "./users/pages/Auth";
// import InverterList from "./crudpages/InverterList";
// import BatteryList from "./crudpages/BatteryList";
// import SolarPanelList from "./crudpages/SolarPanelList";
// import SCCList from "./crudpages/SCCList";

const Home = React.lazy(() => import("./homepage/Home"));
const Auth = React.lazy(() => import("./users/pages/Auth"));
const InverterList = React.lazy(() => import("./crudpages/InverterList"));
const BatteryList = React.lazy(() => import("./crudpages/BatteryList"));
const SolarPanelList = React.lazy(() => import("./crudpages/SolarPanelList"));
const SCCList = React.lazy(() => import("./crudpages/SCCList"));
const Requests = React.lazy(() => import("./crudpages/request-pages/Requests"));
const Users = React.lazy(() => import("./crudpages/UsersList"));

const App = () => {
  const { token, login, logout, userId, email, name, role } = useAuth();

  let routes;

  if (token && role === "Admin") {
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
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/requests" exact>
          <Requests />
        </Route>
        <Redirect to="/requests" />
      </Switch>
    );
  } else if (token && role === "User") {
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
        email: email,
        name: name,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <GlobalProvider>
        <HomeProvider>
          <Router>
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                {routes}
              </Suspense>
            </main>
          </Router>
        </HomeProvider>
      </GlobalProvider>
    </AuthContext.Provider>
  );
};

export default App;

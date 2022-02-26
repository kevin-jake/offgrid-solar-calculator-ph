import React, { Suspense } from "react";
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
import "./index.css";

// import Home from "./homepage/Home";
// import Auth from "./users/pages/Auth";
// import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import InverterList from "./crudpages/InverterList";
// import BatteryList from "./crudpages/BatteryList";
// import SolarPanelList from "./crudpages/SolarPanelList";
// import SCCList from "./crudpages/SCCList";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Home = React.lazy(() => import("./homepage/Home"));
const Auth = React.lazy(() => import("./users/pages/Auth"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const InverterList = React.lazy(() => import("./crudpages/InverterList"));
const BatteryList = React.lazy(() => import("./crudpages/BatteryList"));
const SolarPanelList = React.lazy(() => import("./crudpages/SolarPanelList"));
const SCCList = React.lazy(() => import("./crudpages/SCCList"));

const App = () => {
  const { token, login, logout, userId, email, name, role } = useAuth();

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
              <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
            </main>
          </Router>
        </HomeProvider>
      </GlobalProvider>
    </AuthContext.Provider>
  );
};

export default App;

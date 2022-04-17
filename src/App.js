import React, { Suspense, useEffect, useState } from "react";
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
import DataTable from "./shared/components/DataTable/DataTable";
import { useHttpClient } from "./shared/components/hooks/http-hook";

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
  const [data, setData] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [q, setQ] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        setData(resData.users);
      } catch (err) {}
    };
    fetchUser();
  }, []);
  let routes;

  const search = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);
    console.log(columns);

    return rows.filter((row) =>
      // row.name.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
      // row.email.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
      // row.role.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1
      columns.some(
        (column) =>
          row[column] &&
          row[column].toString().toLowerCase().indexOf(q.toLocaleLowerCase()) >
            -1
      )
    );
  };

  if (token && role === "Admin") {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Home /> */}
          {data[0] && (
            <>
              <DataTable data={search(data)} />
            </>
          )}
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
          {/* <Home /> */}
          {data[0] && <DataTable data={data} />}
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
          {/* <Home /> */}
          {data[0] && (
            <>
              <div className="flex items-center justify-center">
                <div className="flex border-2 rounded">
                  <input
                    type="text"
                    className="px-4 py-2 w-80"
                    placeholder="Search..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <button className="flex items-center justify-center px-4 border-l">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </button>
                </div>
              </div>
              <DataTable data={search(data)} />
            </>
          )}
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

import React from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import "./Styling.scss";
import NavigateCalculations from "./NavigateCalculations";
import { HomeProvider } from "./tabs/context/home-context";
import { LOVProvider } from "./tabs/context/lov-context";
import { GlobalProvider } from "./tabs/context/global-context";

const Home = () => {
  return (
    <GlobalProvider>
      <HomeProvider>
        <LOVProvider>
          <MainCalculation />
          <NavigateCalculations />
        </LOVProvider>
      </HomeProvider>
    </GlobalProvider>
  );
};

export default Home;

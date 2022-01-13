import React from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";
import { HomeProvider } from "./tabs/context/home-context";
import { LOVProvider } from "./tabs/context/lov-context";

const Home = () => {
  return (
    <HomeProvider>
      <LOVProvider>
        <MainCalculation />
        <NavigateCalculations />
      </LOVProvider>
    </HomeProvider>
  );
};

export default Home;

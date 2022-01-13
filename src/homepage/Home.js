import React from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";
import { HomeProvider } from "./tabs/context/home-context";

const Home = () => {
  return (
    <HomeProvider>
      <MainCalculation />
      <NavigateCalculations />
    </HomeProvider>
  );
};

export default Home;

import React from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";
import { HomeProvider } from "./context/home-context";
import { LOVProvider } from "./context/lov-context";
import { GlobalProvider } from "./context/global-context";

const Home = () => {
  return (
    <>
      <MainCalculation />
      <NavigateCalculations />
    </>
  );
};

export default Home;

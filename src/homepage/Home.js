import React, { useEffect, useState } from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";

const Home = () => {
  return (
    <>
      <MainCalculation />
      <NavigateCalculations />
    </>
  );
};

export default Home;

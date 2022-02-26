import React, { useEffect } from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";
import { useHttpClient } from "../shared/components/hooks/http-hook";

const Home = () => {
  return (
    <>
      <MainCalculation />
      <NavigateCalculations />
    </>
  );
};

export default Home;

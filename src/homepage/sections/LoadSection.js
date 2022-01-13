import React, { useContext } from "react";
import load from "../resources/load.png";
import { HomeContext } from "../tabs/context/home-context";

const LoadSection = () => {
  const { loadtab } = useContext(HomeContext);
  return (
    <>
      <div>
        <h3>Load</h3>
        <img src={load} alt="Load" />
      </div>
      <div>
        <p>Total kWh Load: {loadtab.overalls.watthours}</p>
        <p>Battery Size needed (Ah):</p>
        <p>Total Current Load (A):</p>
        <p>Total DC Power Input to Inverter (W):</p>
      </div>
    </>
  );
};

export default LoadSection;

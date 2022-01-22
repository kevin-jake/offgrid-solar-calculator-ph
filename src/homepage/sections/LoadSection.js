import React, { useContext } from "react";
import load from "../resources/load.png";
import { GlobalContext } from "../tabs/context/global-context";
import { HomeContext } from "../tabs/context/home-context";

const LoadSection = () => {
  const { loadtab } = useContext(HomeContext);
  const { totalbattcapacity } = useContext(GlobalContext);
  return (
    <>
      <div>
        <h3>Load</h3>
        <img src={load} alt="Load" />
      </div>
      <div>
        <p>Total kWh Load: {loadtab.overalls.watthours}</p>
        <p>Battery Size needed (Ah): {totalbattcapacity.battsizeneed} </p>
        <p>Total Current Load (A): {totalbattcapacity.currentload} </p>
        <p>
          Total DC Power Input to Inverter (W):
          {totalbattcapacity.powertoinverter}
        </p>
      </div>
    </>
  );
};

export default LoadSection;

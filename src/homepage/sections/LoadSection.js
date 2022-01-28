import React, { useContext } from "react";
import load from "../resources/load.png";
import { GlobalContext } from "../tabs/context/global-context";
import { HomeContext } from "../tabs/context/home-context";

const LoadSection = () => {
  const { loadtab } = useContext(HomeContext);
  const { totalbattcapacity } = useContext(GlobalContext);
  return (
    <>
      <div className="price-header">
        <h3 className="title">Load</h3>
        <img src={load} alt="Load" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Total kWh Load: {loadtab.overalls.watthours}</li>
          <li>Battery Size needed (Ah): {totalbattcapacity.battsizeneed} </li>
          <li>Total Current Load (A): {totalbattcapacity.currentload} </li>
          <li>
            Total DC Power Input to Inverter (W):
            {totalbattcapacity.powertoinverter}
          </li>
        </ul>
      </div>
    </>
  );
};

export default LoadSection;

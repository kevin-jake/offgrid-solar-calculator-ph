import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import inverter from "../resources/inverter.png";
import { HomeContext } from "../tabs/context/home-context";

const InverterSection = () => {
  const { invertertab } = useContext(HomeContext);
  return (
    <>
      <div>
        <h3>Inverter</h3>
        <img src={inverter} alt="Inverter" />
      </div>
      <div>
        <p>Inverter Name: {invertertab.inverterName}</p>
        <p>Inverter Type: {invertertab.type}</p>
        <p>Input Voltage: {invertertab.inputVoltage}</p>
        <p>Wattage: {invertertab.wattage}</p>
        <p>Price: Php {numberWithCommas(invertertab.price.toFixed(2))}</p>
      </div>
    </>
  );
};

export default InverterSection;

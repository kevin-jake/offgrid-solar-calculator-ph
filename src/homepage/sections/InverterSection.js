import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import inverter from "../resources/inverter.png";
import { HomeContext } from "../tabs/context/home-context";

const InverterSection = () => {
  const { invertertab } = useContext(HomeContext);
  return (
    <>
      <div className="price-header">
        <h3 className="title">Inverter</h3>
        <img src={inverter} alt="Inverter" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Inverter Name: {invertertab.inverterName}</li>
          <li>Inverter Type: {invertertab.type}</li>
          <li>Input Voltage: {invertertab.inputVoltage}</li>
          <li>Wattage: {invertertab.wattage}</li>
          <li>Price: Php {numberWithCommas(invertertab.price.toFixed(2))}</li>
        </ul>
      </div>
    </>
  );
};

export default InverterSection;

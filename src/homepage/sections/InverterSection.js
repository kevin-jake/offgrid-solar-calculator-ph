import React from "react";
import inverter from "../resources/inverter.png";

const InverterSection = () => {
  return (
    <>
      <div>
        <h3>Inverter</h3>
        <img src={inverter} alt="Inverter" />
      </div>
      <div>
        <p>Inverter Name:</p>
        <p>Inverter Type:</p>
        <p>Input Voltage:</p>
        <p>Wattage:</p>
        <p>Price:</p>
      </div>
    </>
  );
};

export default InverterSection;

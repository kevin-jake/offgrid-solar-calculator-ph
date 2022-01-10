import React from "react";
import panel from "../resources/panel.png";

const SolarPanelSection = () => {
  return (
    <>
      <div>
        <h3>Solar Panel </h3>
        <img src={panel} alt="Solar Panel" />
      </div>
      <div>
        <p>Solar Panel Name:</p>
        <p>No. of Panels in Parallel:</p>
        <p>No. of Panels in Series:</p>
        <p>Total No. of Panels:</p>
        <p>Price:</p>
      </div>
    </>
  );
};

export default SolarPanelSection;

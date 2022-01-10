import React from "react";
import Card from "../shared/components/UIElements/Card";
import InverterSection from "./sections/InverterSection";
import SCCSection from "./sections/SCCSection";
import LoadSection from "./sections/LoadSection";
import SolarPanelSection from "./sections/SolarPanelSection";
import BatterySection from "./sections/BatterySection";

const MainCalculation = () => {
  return (
    <Card className="home-main">
      <h2>Main Calculations</h2>
      <ul className="main__section">
        <li>
          <Card className="section">
            <SolarPanelSection />
          </Card>
        </li>
        <li>
          <Card className="section">
            <SCCSection />
          </Card>
        </li>
        <li>
          <Card className="section">
            <BatterySection />
          </Card>
        </li>
        <li>
          <Card className="section">
            <InverterSection />
          </Card>
        </li>
        <li>
          <Card className="section">
            <LoadSection />
          </Card>
        </li>
      </ul>
    </Card>
  );
};

export default MainCalculation;

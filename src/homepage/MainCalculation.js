import React, { useContext, useEffect } from "react";
import Card from "../shared/components/UIElements/Card";
import InverterSection from "./sections/InverterSection";
import SCCSection from "./sections/SCCSection";
import LoadSection from "./sections/LoadSection";
import SolarPanelSection from "./sections/SolarPanelSection";
import BatterySection from "./sections/BatterySection";
import Button from "../shared/components/FormElement/Button";
import { GlobalContext } from "./tabs/context/global-context";

const MainCalculation = () => {
  const { voltage, setVoltage, overallprice, setOverallPrice } =
    useContext(GlobalContext);
  useEffect(() => {
    setOverallPrice(overallprice);
  }, [overallprice]);
  return (
    <Card className="home-main">
      <div className="head">
        <h2>Main Calculations </h2>
      </div>
      <div className="head">
        <Button onClick={() => setVoltage(12)}>12V System</Button>
        <Button onClick={() => setVoltage(24)}>24V System</Button>
        <Button onClick={() => setVoltage(48)}>48V System</Button>
        <h2>Voltage System: {voltage} V</h2>
        <h2>Total Price: Php {overallprice} </h2>
      </div>
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

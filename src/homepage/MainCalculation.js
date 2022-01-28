import React, { useContext, useEffect, useState } from "react";
import Card from "../shared/components/UIElements/Card";
import InverterSection from "./sections/InverterSection";
import SCCSection from "./sections/SCCSection";
import LoadSection from "./sections/LoadSection";
import SolarPanelSection from "./sections/SolarPanelSection";
import BatterySection from "./sections/BatterySection";
import Button from "../shared/components/FormElement/Button";
import { GlobalContext } from "./tabs/context/global-context";
import { numberWithCommas } from "../shared/util/format";
import { HomeContext } from "./tabs/context/home-context";
import SectionHead from "./SectionHead";

const MainCalculation = () => {
  const {
    voltage,
    setVoltage,
    overallprice,
    setOverallPrice,
    isValid,
    setValid,
  } = useContext(GlobalContext);
  const { invertertab } = useContext(HomeContext);
  const [validState, setValidState] = useState(isValid);
  useEffect(() => {
    setOverallPrice(overallprice);
  }, [overallprice]);

  useEffect(() => {
    inverterValid(voltage, invertertab.inputVoltage);
  }, [invertertab.inputVoltage, voltage]);

  const inverterValid = (global_voltage, inverter_voltage) => {
    let state = validState;
    if (global_voltage === inverter_voltage || inverter_voltage === 0) {
      state.inverter = true;
      setValidState(state);
      setValid(state);
    } else {
      state.inverter = false;
      setValidState(state);
      setValid(state);
    }
  };

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
        <h2>Total Price: Php {numberWithCommas(overallprice.toFixed(2))} </h2>
      </div>
      <ul className="main__section">
        <li>
          <SectionHead>
            <SolarPanelSection />
          </SectionHead>
        </li>
        <li>
          <SectionHead>
            <SCCSection />
          </SectionHead>
        </li>
        <li>
          <SectionHead>
            <BatterySection />
          </SectionHead>
        </li>
        <li>
          <SectionHead className={` ${!validState.inverter && "invalid"}`}>
            <InverterSection />
          </SectionHead>
        </li>
        <li>
          <SectionHead>
            <LoadSection />
          </SectionHead>
        </li>
      </ul>
    </Card>
  );
};

export default MainCalculation;

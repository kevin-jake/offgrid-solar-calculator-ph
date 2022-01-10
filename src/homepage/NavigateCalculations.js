import React from "react";
import Card from "../shared/components/UIElements/Card";
import TabCalc from "./tabs/TabCalc";

const NavigateCalculations = () => {
  return (
    <Card className="home-main">
      <div className="fill-section">
        <TabCalc />
      </div>
    </Card>
  );
};

export default NavigateCalculations;

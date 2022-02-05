import React from "react";
import TabCalc from "./tabs/TabCalc";

const NavigateCalculations = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container-lg px-6 py-10 mx-4 mb-4 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
        <TabCalc />
      </div>
    </section>
  );
};

export default NavigateCalculations;

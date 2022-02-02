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
    <section className="bg-white dark:bg-gray-900">
      <div className="container-lg px-6 py-8 mx-4 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
        <h1 className="text-2xl my-4 font-semibold text-gray-700 capitalize dark:text-white">
          {" "}
          Voltage System{" "}
        </h1>
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button className="h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
            12V ≈ Php 0.00
          </button>

          <button className="h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            24V ≈ Php 0.00
          </button>

          <button className="h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            48V ≈ Php 0.00
          </button>
        </div>
        <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <div className="w-full md:w-3/12 border border-blue-400 dark:border-blue-300 rounded-xl">
            <div className="w-full bg-white dark:bg-gray-700 relative overflow-hidden rounded-xl">
              <div className="flex items-center justify-between px-4 py-6 space-x-4">
                <div className="flex items-center">
                  <p className="text-lg text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                    Total Price
                  </p>
                </div>
                <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                  Php 44,453.39
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lg px-6 py-10 mx-4">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-3 xl:grid-cols-5 ">
          <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <SolarPanelSection />
          </div>

          <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <SCCSection />
          </div>

          <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <BatterySection />
          </div>

          <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <InverterSection />
          </div>

          <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <LoadSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCalculation;

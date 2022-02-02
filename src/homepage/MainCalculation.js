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
    // <Card className="home-main">
    //   <div className="head">
    //     <h2>Main Calculations </h2>
    //   </div>
    //   <div className="head">
    //     <Button onClick={() => setVoltage(12)}>12V System</Button>
    //     <Button onClick={() => setVoltage(24)}>24V System</Button>
    //     <Button onClick={() => setVoltage(48)}>48V System</Button>
    //     <h2>Voltage System: {voltage} V</h2>
    //     <h2>Total Price: Php {numberWithCommas(overallprice.toFixed(2))} </h2>
    //   </div>
    //   <ul className="main__section">
    //     <li>
    //       <SectionHead>
    //         <SolarPanelSection />
    //       </SectionHead>
    //     </li>
    //     <li>
    //       <SectionHead>
    //         <SCCSection />
    //       </SectionHead>
    //     </li>
    //     <li>
    //       <SectionHead>
    //         <BatterySection />
    //       </SectionHead>
    //     </li>
    //     <li>
    //       <SectionHead className={` ${!validState.inverter && "invalid"}`}>
    //         <InverterSection />
    //       </SectionHead>
    //     </li>
    //     <li>
    //       <SectionHead>
    //         <LoadSection />
    //       </SectionHead>
    //     </li>
    //   </ul>
    // </Card>
    <section class="bg-white dark:bg-gray-900">
      <div class="container-lg px-6 py-10 mx-4 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
        <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          {" "}
          Voltage System{" "}
        </h1>
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button class="h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
            12V ≈ Php 0.00
          </button>

          <button class="h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            24V ≈ Php 0.00
          </button>

          <button class="h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            48V ≈ Php 0.00
          </button>
        </div>
        <div class="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <div class="w-full md:w-3/12 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <div class="w-full bg-white dark:bg-gray-700 relative overflow-hidden rounded-xl">
              <div class="flex items-center justify-between px-4 py-6 space-x-4">
                <div class="flex items-center">
                  <p class="text-lg text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                    Total Price
                  </p>
                </div>
                <div class="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                  Php 44,453.39
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-lg px-6 py-10 mx-4">
        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-3 xl:grid-cols-5 ">
          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <SolarPanelSection />
          </div>

          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span class="inline-block text-blue-500 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
            </span>

            <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
              Easy to customiztions
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ab nulla quod dignissimos vel non corrupti doloribus voluptatum
              eveniet
            </p>

            <a
              href="#"
              class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>

          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span class="inline-block text-blue-500 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>

            <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
              Simple & clean designs
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ab nulla quod dignissimos vel non corrupti doloribus voluptatum
              eveniet
            </p>

            <a
              href="#"
              class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span class="inline-block text-blue-500 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>

            <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
              Simple & clean designs
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ab nulla quod dignissimos vel non corrupti doloribus voluptatum
              eveniet
            </p>

            <a
              href="#"
              class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span class="inline-block text-blue-500 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>

            <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
              Simple & clean designs
            </h1>

            <p class="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              ab nulla quod dignissimos vel non corrupti doloribus voluptatum
              eveniet
            </p>

            <a
              href="#"
              class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCalculation;

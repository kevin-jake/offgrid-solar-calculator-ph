import React, { useContext } from "react";
import { kiloformat } from "../../shared/util/format";
import load from "../resources/load.png";
import { GlobalContext } from "../tabs/context/global-context";
import { HomeContext } from "../tabs/context/home-context";

const LoadSection = () => {
  const { loadtab } = useContext(HomeContext);
  const { totalbattcapacity } = useContext(GlobalContext);
  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Load
        </h1>
        <span className="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={load}
            alt="Load"
          />
        </span>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          Total Load: {kiloformat(loadtab.overalls.watthours) + "Wh"}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Battery Size needed: {totalbattcapacity.battsizeneed} Ah
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total Current Load: {totalbattcapacity.currentload} A
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Power Input to Inverter: {totalbattcapacity.powertoinverter} W
        </li>
      </ul>
    </>
  );
};

export default LoadSection;

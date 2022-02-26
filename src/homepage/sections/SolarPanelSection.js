import React, { useContext } from "react";
import { kiloformat, numberWithCommas } from "../../shared/util/format";
import panel from "../resources/panel.png";
import { GlobalContext } from "../context/global-context";

const SolarPanelSection = () => {
  const { solarpanel } = useContext(GlobalContext);
  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Solar Panel
        </h1>
        <span className="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={panel}
            alt="Solar Panel"
          />
        </span>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          Solar Panel Name: {solarpanel.pvname}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          No. of Panels in Parallel: {solarpanel.pvparallel}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          No. of Panels in Series: {solarpanel.pvseries}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total Wattage: {kiloformat(solarpanel.totalwattage) + "W"}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total No. of Panels: {solarpanel.totalnumberpv}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total Price: Php {numberWithCommas(solarpanel.totalprice.toFixed(2))}
        </li>
      </ul>
    </>
  );
};

export default SolarPanelSection;

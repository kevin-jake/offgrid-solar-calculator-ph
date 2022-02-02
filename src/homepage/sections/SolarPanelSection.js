import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import panel from "../resources/panel.png";
import { GlobalContext } from "../tabs/context/global-context";

const SolarPanelSection = () => {
  const { solarpanel } = useContext(GlobalContext);
  return (
    <>
      {/* <div className="price-header">
        <h3 className="title">Solar Panel </h3>
        <img src={panel} alt="Solar Panel" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Solar Panel Name: {solarpanel.pvname}</li>
          <li>No. of Panels in Parallel: {solarpanel.pvparallel}</li>
          <li>No. of Panels in Series: {solarpanel.pvseries}</li>
          <li>Total No. of Panels: {solarpanel.totalnumberpv}</li>
          <li>
            Total Price: Php{" "}
            {numberWithCommas(solarpanel.totalprice.toFixed(2))}
          </li>
        </ul>
      </div> */}
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Solar Panel
        </h1>
        <span class="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={panel}
            alt="Solar Panel"
          />
        </span>
      </div>
      <ul class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          Solar Panel Name: {solarpanel.pvname}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          No. of Panels in Parallel: {solarpanel.pvparallel}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          No. of Panels in Series: {solarpanel.pvseries}
        </li>
        <li class="py-2 px-4 w-full rounded-b-lg">
          Total No. of Panels: {solarpanel.totalnumberpv}
        </li>
        <li class="py-2 px-4 w-full rounded-b-lg">
          Total Price: Php {numberWithCommas(solarpanel.totalprice.toFixed(2))}
        </li>
      </ul>
    </>
  );
};

export default SolarPanelSection;

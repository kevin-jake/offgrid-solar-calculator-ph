import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import inverter from "../resources/inverter.png";
import { HomeContext } from "../tabs/context/home-context";

const InverterSection = () => {
  const { invertertab } = useContext(HomeContext);
  return (
    <>
      {/* <div className="price-header">
        <h3 className="title">Inverter</h3>
        <img src={inverter} alt="Inverter" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Inverter Name: {invertertab.inverterName}</li>
          <li>Inverter Type: {invertertab.type}</li>
          <li>Input Voltage: {invertertab.inputVoltage}</li>
          <li>Wattage: {invertertab.wattage}</li>
          <li>Price: Php {numberWithCommas(invertertab.price.toFixed(2))}</li>
        </ul>
      </div> */}
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Inverter
        </h1>
        <span class="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={inverter}
            alt="Inverter"
          />
        </span>
      </div>
      <ul class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          Inverter Name: {invertertab.inverterName}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Inverter Type: {invertertab.type}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Input Voltage: {invertertab.inputVoltage}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Wattage: {invertertab.wattage}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Price: Php {numberWithCommas(invertertab.price.toFixed(2))}
        </li>
      </ul>
    </>
  );
};

export default InverterSection;

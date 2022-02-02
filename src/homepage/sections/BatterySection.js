import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import bat from "../resources/bat.png";
import { HomeContext } from "../tabs/context/home-context";

const BatterySection = () => {
  const { batterytab } = useContext(HomeContext);
  console.log(batterytab);
  return (
    <>
      {/* <div className="price-header">
        <h3 className="title">Battery</h3>
        <img src={bat} alt="Battery" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Battery Type: {batterytab.batttype}</li>
          <li>Battery Model / Name: {batterytab.battname}</li>
          <li>Battery Voltage: {batterytab.voltage}</li>
          <li>Battery Capacity: {batterytab.battcapacity}</li>
          <li>
            Price per pc.: Php{" "}
            {batterytab.priceperpc &&
              numberWithCommas(batterytab.priceperpc.toFixed(2))}
          </li>
          <li>Total Number of Battery: {batterytab.totalqty}</li>
          <li>Battery Total Capacity: {batterytab.totalcapacity} Ah</li>
          <li>
            Total Price: Php{" "}
            {batterytab.totalprice &&
              numberWithCommas(batterytab.totalprice.toFixed(2))}
          </li>
        </ul>
      </div> */}
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Battery
        </h1>
        <span class="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={bat}
            alt="Battery"
          />
        </span>
      </div>
      <ul class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          Battery Type: {batterytab.batttype}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Battery Model / Name: {batterytab.battname}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Battery Voltage: {batterytab.voltage}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Battery Capacity: {batterytab.battcapacity}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Price per pc.: Php{" "}
          {batterytab.priceperpc &&
            numberWithCommas(batterytab.priceperpc.toFixed(2))}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total Number of Battery: {batterytab.totalqty}
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Battery Total Capacity: {batterytab.totalcapacity} Ah
        </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          Total Price: Php{" "}
          {batterytab.totalprice &&
            numberWithCommas(batterytab.totalprice.toFixed(2))}
        </li>
      </ul>
    </>
  );
};

export default BatterySection;

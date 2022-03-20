import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import bat from "../resources/bat.png";
import { HomeContext } from "../context/home-context";

const BatterySection = () => {
  const { batterytab, seriesParallelTable } = useContext(HomeContext);

  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Battery
        </h1>
        <span className="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={bat}
            alt="Battery"
          />
        </span>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">Battery Type:</p>
            <p className=" dark:text-white font-bold">{batterytab.batttype}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">Battery Name:</p>
            <p className=" dark:text-white font-bold">{batterytab.battname}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">Battery Model:</p>
            <p className=" dark:text-white font-bold">{batterytab.battmodel}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">
              Battery Configuration:
            </p>
            <p className=" dark:text-white font-bold">
              {seriesParallelTable.series}S {seriesParallelTable.parallel}P
            </p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">
              Total No. of Battery:
            </p>
            <p className=" dark:text-white font-bold">{batterytab.totalqty}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">
              Battery Total Capacity:
            </p>
            <p className=" dark:text-white font-bold">
              {batterytab.totalcapacity} Ah
            </p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400 ">Total Price:</p>
            <p className=" dark:text-white font-bold">
              Php{" "}
              {batterytab.totalprice &&
                numberWithCommas(batterytab.totalprice.toFixed(2))}
            </p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default BatterySection;

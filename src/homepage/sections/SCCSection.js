import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import sccimg from "../resources/scc.png";
import { GlobalContext } from "../tabs/context/global-context";

const SCCSection = () => {
  const { scc } = useContext(GlobalContext);
  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center">
        <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
          Solar Charge Controller
        </h1>
        <span className="inline text-blue-500 dark:text-blue-400">
          <img
            className="object-contain object-center w-20 h-20 mx-auto rounded-lg"
            src={sccimg}
            alt="SCC"
          />
        </span>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          SCC Name: {scc.sccname}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          SCC Type: {scc.type}
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          SCC Ampere Rating: {scc.amprating} A
        </li>
        <li className="py-2 px-4 w-full rounded-b-lg">
          Price: Php {numberWithCommas(scc.price.toFixed(2))}
        </li>
      </ul>
    </>
  );
};

export default SCCSection;

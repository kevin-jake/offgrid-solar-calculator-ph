import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import sccimg from "../resources/scc.png";
import { GlobalContext } from "../context/global-context";

const SCCSection = ({ errormsg }) => {
  const { scc } = useContext(GlobalContext);
  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center text-inherit">
        <h1
          className={
            "text-2xl font-semibold capitalize dark:text-white text-inherit"
          }
        >
          {" "}
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
      <ul className="w-full text-sm font-medium bg-inherit rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-inherit">
        <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400"> SCC Name:</p>
            <p className=" dark:text-white font-bold">{scc.sccname}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400"> SCC Type:</p>
            <p className=" dark:text-white font-bold">{scc.type}</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400">
              {" "}
              SCC Ampere Rating:
            </p>
            <p className=" dark:text-white font-bold">{scc.amprating} A</p>
          </div>
        </li>
        <li className="py-2 px-4 w-full rounded-b-lg">
          <div className="grid grid-cols-2">
            <p className="text-blue-700 dark:text-blue-400"> Price: Php</p>
            <p className=" dark:text-white font-bold">
              Php {numberWithCommas(scc.price.toFixed(2))}
            </p>
          </div>
        </li>
      </ul>
      {errormsg && (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg  dark:bg-gray-800">
          <div className="flex items-center justify-center w-12 bg-red-500">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <p className="text-sm text-red-600 dark:text-red-200">
                {errormsg}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SCCSection;

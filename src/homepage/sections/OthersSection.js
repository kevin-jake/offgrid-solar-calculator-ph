import React, { useContext, useEffect, useState } from "react";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "../context/home-context";

const OthersSection = ({ errormsg }) => {
  const { wiresize, circuitBreaker } = useContext(HomeContext);
  const [rowData, setRowData] = useState([
    {
      label: "",
      wirePrice: 0,
      breakerPrice: 0,
      suggestedAWG: 0,
      legnth: "",
      breakerSize: 0,
    },
    {
      label: "",
      wirePrice: 0,
      breakerPrice: 0,
      suggestedAWG: 0,
      legnth: "",
      breakerSize: 0,
    },
    {
      label: "",
      wirePrice: 0,
      breakerPrice: 0,
      suggestedAWG: 0,
      legnth: "",
      breakerSize: 0,
    },
    {
      label: "",
      wirePrice: 0,
      breakerPrice: 0,
      suggestedAWG: 0,
      legnth: "",
      breakerSize: 0,
    },
  ]);
  const [grandTotal, setTotalPrice] = useState(0);

  useEffect(() => {
    let data = rowData;
    let total = 0;
    wiresize.wireDetails.map((obj, index) => {
      data[index].label = obj.label;
      data[index].legnth = obj.length;
      data[index].suggestedAWG = obj.suggestedAWG;
      data[index].wirePrice = obj.totalprice;
      total += obj.totalprice;
    });
    circuitBreaker.data.map((obj, index) => {
      data[index].breakerSize = obj.breakerSize;
      data[index].breakerPrice = obj.price;
      total += obj.price;
    });

    console.log(total);
    setRowData(data);
    setTotalPrice(total);
  }, []);

  const renderTR = (obj, index) => {
    return (
      <tr key={"other-" + index} className="bg-white border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          {obj.label}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          {obj.length}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          {obj.suggestedAWG}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          Php {numberWithCommas(obj.wirePrice.toFixed(2))}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          {obj.breakerSize}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          Php {numberWithCommas(obj.breakerPrice.toFixed(2))}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
          Php {numberWithCommas((obj.wirePrice + obj.breakerPrice).toFixed(2))}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="container-lg p-6 mx-auto lg:flex lg:justify-between lg:items-center text-inherit">
        <h1
          className={
            "text-2xl font-semibold capitalize dark:text-white text-inherit"
          }
        >
          Others
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="overflow-hidden min-w-full my-5 border-collapse border border-slate-500">
          <thead className="bg-white border-b">
            <tr>
              <th
                scope="col"
                className="font-medium text-blue-700 px-6 py-4 text-left border border-slate-600"
              >
                Wiring
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                Length in Meters
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                AWG
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                Wire Price
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                Breaker
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                Breaker Price
              </th>
              <th
                scope="col"
                className=" font-medium text-blue-700 px-6 py-4 text-left border border-slate-600 "
              >
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((obj, index) => {
              return renderTR(obj, index);
            })}
            <tr key="total" className="bg-white border-b">
              <td
                colSpan="3"
                className="text-right justify-center px-6 py-2 whitespace-nowrap text-sm font-medium text-blue-700 border border-slate-700"
              >
                Wire TOTAL PRICE
              </td>
              <td className=" px-6 py-2 text-sm font-medium text-gray-900 border border-slate-700">
                Php {numberWithCommas(wiresize.wireSizingPrice.toFixed(2))}
              </td>
              <td
                colSpan="2"
                className="text-right justify-center px-6 py-2 whitespace-nowrap text-sm font-medium text-blue-700 border border-slate-700"
              >
                TOTAL
              </td>
              <td className=" px-6 py-2 text-sm font-medium text-gray-900 border border-slate-700">
                Php {numberWithCommas(grandTotal.toFixed(2))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

export default OthersSection;

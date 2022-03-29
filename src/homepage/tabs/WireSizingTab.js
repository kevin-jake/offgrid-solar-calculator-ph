import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "../context/home-context";

const WireSizingTab = () => {
  const { wiresize, setWireSize } = useContext(HomeContext);

  const handleItemChanged = (event, index, key) => {
    let items_var = wiresize;
    items_var[index][key] = event.target.value;
    setWireSize(items_var);
  };

  const handleItemDeleted = () => {};

  const renderTR = (obj, index) => {
    return (
      <tr key={"item-" + index} className="bg-white border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.label}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.wiretype}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <input
            id="length"
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={obj.length}
            onChange={(e) => handleItemChanged(e, index, "length")}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <input
            id="price"
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={obj.price_per_meter}
            onChange={(e) => handleItemChanged(e, index, "price_per_meter")}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.computedVdi}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <input
            id="suggestedAWG"
            type="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={obj.suggestedAWG}
            onChange={(e) => handleItemChanged(e, index, "suggestedAWG")}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.totalprice}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="grid-row gap-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 col-span-2">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-auto">
              <table className="min-w-full my-5">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Wiring
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Wire Type
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Length in Meters
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Price per meter
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Computed VDI
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Suggested AWG
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wiresize.map((obj, index) => {
                    return renderTR(obj, index);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-2">
          <div className=" flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full my-5 border-collapse border border-slate-500">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-lg font-medium text-gray-900 px-6 py-4 text-left border border-slate-600"
                        >
                          VDI
                        </th>
                        <th
                          scope="col"
                          className="text-lg font-medium text-gray-900 px-6 py-4 text-left border border-slate-600 "
                        >
                          AWG
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          16
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          2
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          14
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          3
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          12
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          10
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          8
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          8
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          12
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          6
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          20
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          4
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          34
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          2
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          49
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          1/0
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          62
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          2/0
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          62
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          2/0
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          78
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          3/0
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          99
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-sm font-medium text-gray-900 border border-slate-700">
                          4/0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs font-bold dark:text-blue-400">
                    Source:
                    <a
                      className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/watch?v=ybPP9Omd-o0"
                    >
                      https://www.youtube.com/watch?v=ybPP9Omd-o0
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WireSizingTab;

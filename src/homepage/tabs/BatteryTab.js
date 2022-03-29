import React, { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "../context/home-context";

const BatteryTab = () => {
  const { batterytab, setBattery, seriesParallelTable, dodTable } =
    useContext(HomeContext);
  const [itemState, setItemState] = useState(batterytab);
  const [batterylist, setBattList] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  const [optionState, setOptions] = useState();

  useEffect(() => {
    const fetchBattery = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/battery"
        );
        const options = responseData.battery.map((i) => ({
          label: i.battname,
          value: i.id,
        }));
        setOptions(options);
        setBattList(responseData.battery);
      } catch (err) {}
    };
    fetchBattery();
    // eslint-disable-next-line
  }, [sendRequest]);

  useEffect(() => {
    setItemState(batterytab);
    // eslint-disable-next-line
  }, [batterytab]);

  const filterOptions = (inputValue, array) => {
    return array.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const fetchBattery = async (input, callback) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/battery"
      );
      const options = responseData.battery.map((i) => ({
        label: i.battname,
        value: i.id,
      }));
      callback(filterOptions(input, options));
    } catch (err) {}
  };

  const handleItemChanged = (event) => {
    let selectedId = event.value;
    let index = batterylist.findIndex((x) => x.id === selectedId);
    setItemState(batterylist[index]);
    setBattery(batterylist[index]);
  };
  // console.log(seriesParallelTable);
  return (
    <>
      <div className="container-lg px-6 py-4 mx-4">
        <div className="grid grid-cols-1 gap-4 xl:mt-4 md:grid-cols-1 xl:grid-cols-1">
          <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
            Select Battery:
          </label>
          <AsyncSelect
            cacheOptions
            defaultInputValue={itemState.battname}
            defaultOptions={optionState}
            onChange={handleItemChanged}
            loadOptions={fetchBattery}
            isLoading={isLoading}
          />
          <div className="grid grid-cols-1 gap-8  md:grid-cols-2 xl:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battname"
                >
                  Battery Name:
                </label>
                <input
                  id="battname"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={itemState.battname}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battype"
                >
                  Battery Type:
                </label>
                <input
                  id="battype"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={itemState.batttype}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battmodel"
                >
                  Battery Model:
                </label>
                <input
                  id="battmodel"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={itemState.battmodel}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battvolts"
                >
                  Battery Voltage:
                </label>
                <input
                  id="battvolts"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={itemState.voltage + " V"}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battcap"
                >
                  Battery Capacity:
                </label>
                <input
                  id="battcap"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={itemState.battcapacity + " Ah"}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battcap"
                >
                  Price per pc.:
                </label>
                <input
                  id="battcap"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={
                    "Php " + numberWithCommas(itemState.priceperpc.toFixed(2))
                  }
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battseries"
                >
                  Battery in Series:
                </label>
                <input
                  id="battseries"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={seriesParallelTable.series}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="battparallel"
                >
                  Battery in Parallel:
                </label>
                <input
                  id="battparallel"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={seriesParallelTable.parallel}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="totalbatt"
                >
                  Total No. of Battery:
                </label>
                <input
                  id="totalbatt"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={seriesParallelTable.totalnumber}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="totalcap"
                >
                  Total Capacity:
                </label>
                <input
                  id="totalcap"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={seriesParallelTable.totalcapacity}
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="totalcap"
                >
                  Total Price:
                </label>
                <input
                  id="totalcap"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                  disabled={true}
                  value={
                    "Php " +
                    numberWithCommas(seriesParallelTable.totalprice.toFixed(2))
                  }
                />
              </div>
              <div>
                <label
                  className="text-gray-700 text-lg font-medium dark:text-gray-200"
                  htmlFor="price"
                >
                  Supplier's Link:{" "}
                </label>
                <a
                  className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600 text-lg font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={itemState.link}
                >
                  {itemState.link ? "Link" : ""}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full my-5">
                        <thead className="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Battery Type
                            </th>
                            <th
                              scope="col"
                              className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Suggested DOD
                            </th>
                            <th
                              scope="col"
                              className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Lead Acid
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              50%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.leadacid.dodbattcap + " Ah"}
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Lithium Ion
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              88%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.lion.dodbattcap + " Ah"}
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              LiFePo4
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              90%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.lifepo.dodbattcap + " Ah"}
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td
                              colSpan={2}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                            >
                              <h4 className="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600">
                                Battery Size
                              </h4>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.leadacid.battcapacity + " Ah"}
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td
                              colSpan={2}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                            >
                              <h4 className="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600">
                                {" "}
                                Total Current Load{" "}
                              </h4>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.lifepo.totalCurrentLoad + " A"}
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td
                              colSpan={2}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                            >
                              <h4 className="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600">
                                {" "}
                                Total DC Watts Input to Inverter{" "}
                              </h4>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {dodTable.lifepo.totalDCPower + " W"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatteryTab;

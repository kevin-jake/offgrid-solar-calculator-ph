import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "../context/home-context";
import { LOVContext } from "../context/lov-context";

const BatteryTab = ({ battdata, doddata }) => {
  const { batterytab, setBattery } = useContext(HomeContext);
  const [itemState, setItemState] = useState(batterytab);
  const { batterylist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.battname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    arrvar.shift();
    for (i; i < batterylist.length; i++) {
      arrvar.push({
        value: batterylist[i].id,
        label: batterylist[i].battname,
      });
    }
    setOptions(arrvar);
  }, [optionState, batterylist]);

  const handleItemChanged = (event) => {
    // console.log(event);
    let selectedId = event.value;
    let index = batterylist.findIndex((x) => x.id === selectedId);
    // console.log(batterylist[index]);
    setItemState(batterylist[index]);
    setBattery(batterylist[index]);
    setSelectedState(event);
  };
  console.log(battdata);
  return (
    <>
      {/* <div className="square">
        <div className="content">
          <div className="table">
            <div className="table-cell">
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Select
                        value={selectedState}
                        onChange={handleItemChanged}
                        options={optionState}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div>
                <p>Battery Type: {itemState.batttype}</p>
                <p>Battery Model / Name: {itemState.battmodel}</p>
                <p>Battery Voltage: {itemState.voltage}</p>
                <p>Battery Capacity: {itemState.battcapacity}</p>
                <p>
                  Price per pc.: Php
                  {numberWithCommas(itemState.priceperpc.toFixed(2))}
                </p>
                <p>No. of Battery in Series: {battdata.series} </p>
                <p>No. of Battery in Parallel: {battdata.parallel} </p>
                <p>Total No. of Battery: {battdata.totalnumber}</p>
                <p>Total Capacity: {battdata.totalcapacity}</p>
                <p>
                  Total Price: Php
                  {numberWithCommas(battdata.totalprice.toFixed(2))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <h2>Battery Depth of Discharge (DOD)</h2>
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Type</th>
                    <th>Suggested DOD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h4>Battery Size (Ah)</h4>
                    </td>
                    <td>{doddata.leadacid.battcapacity}</td>
                  </tr>
                  <tr>
                    <td>Lead Acid</td>
                    <td>50%</td>
                    <td>{doddata.leadacid.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>Lithium Ion</td>
                    <td>88%</td>
                    <td>{doddata.lion.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>LiFePo4</td>
                    <td>90%</td>
                    <td>{doddata.lifepo.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total Current Load (A)</td>
                    <td>{doddata.lifepo.totalCurrentLoad}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total DC Watts Input to Inverter (W)</td>
                    <td>{doddata.lifepo.totalDCPower}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container-lg px-6 py-4 mx-4">
        <div className="grid grid-cols-1 gap-4 xl:mt-4 md:grid-cols-1 xl:grid-cols-1">
          <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
            Select Battery:
          </label>
          <Select
            value={selectedState}
            onChange={handleItemChanged}
            options={optionState}
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
                  value={battdata.series}
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
                  value={battdata.parallel}
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
                  value={battdata.totalnumber}
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
                  value={battdata.totalcapacity}
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
                    "Php " + numberWithCommas(battdata.totalprice.toFixed(2))
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
                              {doddata.leadacid.dodbattcap + " Ah"}
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
                              {doddata.lion.dodbattcap + " Ah"}
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
                              {doddata.lifepo.dodbattcap + " Ah"}
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
                              {doddata.leadacid.battcapacity + " Ah"}
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
                              {doddata.lifepo.totalCurrentLoad + " A"}
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
                              {doddata.lifepo.totalDCPower + " W"}
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

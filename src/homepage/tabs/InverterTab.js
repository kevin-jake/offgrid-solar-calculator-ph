import React, { useContext, useState } from "react";
import { HomeContext } from "./context/home-context";
import Select from "react-select";
import { LOVContext } from "./context/lov-context";
import { useEffect } from "react/cjs/react.development";
import { numberWithCommas } from "../../shared/util/format";

const InverterTab = (props) => {
  const { invertertab, setInverter } = useContext(HomeContext);
  const { inverters } = useContext(LOVContext);
  const [itemState, setItemState] = useState(invertertab);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.inverterName,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    arrvar.shift();
    for (i; i < inverters.length; i++) {
      arrvar.push({
        value: inverters[i].id,
        label: inverters[i].inverterName,
      });
    }
    setOptions(arrvar);
  }, [optionState, inverters]);

  const handleItemChanged = (event) => {
    // console.log(event);
    let selectedId = event.value;
    let index = inverters.findIndex((x) => x.id === selectedId);
    // console.log(inverters[index]);
    setItemState(inverters[index]);
    setInverter(inverters[index]);
    setSelectedState(event);
  };
  // console.log(selectedState);
  return (
    <div className="container-lg px-6 py-4 mx-4">
      <div className="grid grid-cols-1 gap-4 xl:mt-12 md:grid-cols-1 xl:grid-cols-1">
        <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
          Select Inverter:{" "}
        </label>
        <Select
          value={selectedState}
          onChange={handleItemChanged}
          options={optionState}
        />
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="inverterName"
            >
              Inverter Name
            </label>
            <input
              id="inverterName"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.inverterName}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="type"
            >
              Inverter Type
            </label>
            <input
              id="type"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.type}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="volts"
            >
              Input Voltage
            </label>
            <input
              id="volts"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.inputVoltage + " V"}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="eff"
            >
              Efficiency
            </label>
            <input
              id="eff"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.efficiency + " %"}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="watt"
            >
              Wattage
            </label>
            <input
              id="watt"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.wattage + " W"}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={"Php " + numberWithCommas(itemState.price.toFixed(2))}
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
              href={itemState.link}
            >
              {itemState.link ? "Link" : ""}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterTab;

import React, { useContext, useState, useEffect } from "react";
import { HomeContext } from "../context/home-context";
import AsyncSelect from "react-select/async";
// import { LOVContext } from "../context/lov-context";
import { numberWithCommas } from "../../shared/util/format";
import { useHttpClient } from "../../shared/components/hooks/http-hook";

const InverterTab = (props) => {
  const { invertertab, setInverter } = useContext(HomeContext);
  // const { inverters, setInvLOV } = useContext(LOVContext);
  const [inverters, setInverters] = useState([]);
  const [itemState, setItemState] = useState(invertertab);
  const { sendRequest } = useHttpClient();
  const [optionState, setOptions] = useState();

  useEffect(() => {
    const fetchInverter = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/inverter"
        );
        const options = responseData.inverters.map((i) => ({
          label: i.inverterName,
          value: i.id,
        }));
        setOptions(options);
        setInverters(responseData.inverters);
      } catch (err) {}
    };
    fetchInverter();
  }, [sendRequest]);

  // useEffect(() => {
  //   let i = 0;
  //   let arrvar = optionState;
  //   arrvar.shift();
  //   for (i; i < inverters.length; i++) {
  //     arrvar.push({
  //       value: inverters[i].id,
  //       label: inverters[i].inverterName,
  //     });
  //   }
  //   setOptions(arrvar);
  // }, [optionState, inverters]);

  const filterOptions = (inputValue, array) => {
    return array.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const fetchInverter = async (input, callback) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/inverter"
      );
      // setInvLOV(responseData.inverters);
      const options = responseData.inverters.map((i) => ({
        label: i.inverterName,
        value: i.id,
      }));
      callback(filterOptions(input, options));
    } catch (err) {}
  };

  const handleItemChanged = (event) => {
    console.log(event.value);
    const selectedId = event.value;
    let index = inverters.findIndex((x) => x.id === selectedId);
    console.log(inverters[index]);
    setItemState(inverters[index]);
    setInverter(inverters[index]);
  };
  return (
    <div className="container-lg px-6 py-4 mx-4">
      <div className="grid grid-cols-1 gap-4 xl:mt-12 md:grid-cols-1 xl:grid-cols-1">
        <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
          Select Inverter:{" "}
        </label>
        <AsyncSelect
          cacheOptions
          defaultInputValue={itemState.inverterName}
          defaultOptions={optionState}
          onChange={handleItemChanged}
          loadOptions={fetchInverter}
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
              rel="noopener noreferrer"
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

import React, { useEffect, useState } from "react";
import {
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import RequestList from "./RequestList";

const inverterFields = [
  {
    listkey: "id",
    type: "text",
    label: "ID",
  },
  {
    listkey: "inverterName",
    type: "text",
    label: "Name",
    validator: [VALIDATOR_REQUIRE()],
  },
  { listkey: "type", type: "text", label: "Type" },
  {
    listkey: "inputVoltage",
    type: "number",
    label: "Input Voltage",
    unit: "V",
    validator: [VALIDATOR_REQUIRE()],
  },
  {
    listkey: "efficiency",
    type: "text",
    label: "Efficiency",
    unit: "%",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "wattage",
    type: "number",
    label: "Wattage",
    unit: "W",
    validator: [VALIDATOR_REQUIRE()],
  },
  {
    listkey: "price",
    type: "text",
    label: "Price",
    unit: "Php",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  // { listkey: "img", type: "text", label: "Image" },
  { listkey: "link", type: "text", label: "Link" },
];
const batteryfields = [
  {
    listkey: "id",
    type: "text",
    label: "ID",
  },
  {
    listkey: "battname",
    type: "text",
    label: "Name",
    validator: [VALIDATOR_REQUIRE()],
  },
  {
    listkey: "batttype",
    type: "select",
    label: "Battery Type",
    options: [
      {
        value: "Lead Acid",
        label: "Lead Acid",
      },
      {
        value: "Lithium Ion",
        label: "Lithium Ion",
      },
      {
        value: "LiFePo4",
        label: "LiFePo4",
      },
    ],
    validator: [VALIDATOR_REQUIRE()],
  },
  { listkey: "battmodel", type: "text", label: "Model" },
  {
    listkey: "voltage",
    type: "text",
    label: "Voltage",
    unit: "V",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "battcapacity",
    type: "text",
    label: "Capacity",
    unit: "Ah",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "priceperpc",
    type: "text",
    label: "Price per pc.",
    unit: "Php",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  // { listkey: "img", type: "text", label: "Image" },
  { listkey: "link", type: "text", label: "Link" },
];
const sccFields = [
  {
    listkey: "id",
    type: "text",
    label: "ID",
  },
  {
    listkey: "sccname",
    type: "text",
    label: "Name",
    validator: [VALIDATOR_REQUIRE()],
  },
  {
    listkey: "type",
    type: "text",
    label: "Type",
    validator: [VALIDATOR_REQUIRE()],
  },
  { listkey: "brand", type: "text", label: "Brand" },
  { listkey: "supplier", type: "text", label: "Supplier" },
  {
    listkey: "amprating",
    type: "text",
    label: "Ampere Rating",
    unit: "A",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "price",
    type: "text",
    label: "Price",
    unit: "Php",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  // { listkey: "img", type: "text", label: "Image" },
  { listkey: "link", type: "text", label: "Link" },
];
const pvFields = [
  {
    listkey: "id",
    type: "text",
    label: "ID",
  },
  {
    listkey: "pvname",
    type: "text",
    label: "Name",
    validator: [VALIDATOR_REQUIRE()],
  },
  {
    listkey: "wattage",
    type: "number",
    label: "Wattage",
    unit: "W",
    validator: [VALIDATOR_REQUIRE()],
  },
  { listkey: "brand", type: "text", label: "Brand" },
  { listkey: "supplier", type: "text", label: "Supplier" },
  {
    listkey: "voc",
    type: "text",
    label: "Voc",
    unit: "V",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "imp",
    type: "text",
    label: "Imp",
    unit: "A",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "vmp",
    type: "text",
    label: "Vmp",
    unit: "V",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "isc",
    type: "text",
    label: "Isc",
    unit: "A",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  {
    listkey: "price",
    type: "text",
    label: "Price",
    unit: "Php",
    validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
  },
  // { listkey: "img", type: "text", label: "Image" },
  { listkey: "link", type: "text", label: "Link" },
];

const Requests = () => {
  const [openTab, setOpenTab] = useState(1);
  const [tabpanel, setTabPanel] = useState();
  const [requestType, setRequestType] = useState("ADD");

  useEffect(() => {
    handleSelectedTab(openTab);
  }, [requestType]);

  const handleSelectedTab = (selected) => {
    let buttons = (
      <div className="grid mt-4 lg:grid-row  xl:grid-cols-2 gap-4 sm:grid-row md:grid-row">
        <button
          className={`px-5 py-2 border-blue-500 border  rounded transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none md:row-span-auto ${
            requestType === "ADD" ? "bg-blue-700 text-white" : "text-blue-500"
          }`}
          onClick={() => {
            handleButtons("ADD");
          }}
        >
          Add Requests
        </button>
        <button
          className={`px-5 py-2 border-blue-500 border  rounded transition duration-300 hover:bg-blue-600 hover:text-white focus:outline-none md:row-span-auto ${
            requestType === "EDIT" ? "bg-blue-700 text-white" : "text-blue-500"
          }`}
          onClick={() => {
            handleButtons("EDIT");
          }}
        >
          Edit Requests
        </button>
      </div>
    );
    switch (selected) {
      case 1: {
        setOpenTab(1);
        setTabPanel(
          <div>
            {buttons}
            <RequestList
              title="Inverter"
              fields={inverterFields}
              fetch={requestType}
            />
          </div>
        );
        break;
      }
      case 2: {
        setOpenTab(2);
        setTabPanel(
          <div>
            {buttons}
            <RequestList
              title="Battery"
              fields={batteryfields}
              fetch={requestType}
            />
          </div>
        );
        break;
      }
      case 3: {
        setOpenTab(3);
        setTabPanel(
          <div>
            {buttons}
            <RequestList
              title="Solar Panel"
              fields={pvFields}
              fetch={requestType}
            />
          </div>
        );
        break;
      }
      case 4: {
        setOpenTab(4);
        setTabPanel(
          <div>
            {buttons}
            <RequestList title="SCC" fields={sccFields} fetch={requestType} />
          </div>
        );
        break;
      }
    }
  };

  const handleButtons = (typeReqs) => {
    console.log(typeReqs);
    setRequestType(typeReqs);
  };

  return (
    <>
      <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto border-2 border-blue-400 dark:border-blue-300 rounded-xl relative">
        <div className="align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                handleSelectedTab(1);
              }}
              className={
                openTab === 1
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              Inverter
            </button>

            <button
              onClick={() => {
                handleSelectedTab(2);
              }}
              className={
                openTab === 2
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              Battery
            </button>

            <button
              onClick={() => {
                handleSelectedTab(3);
              }}
              className={
                openTab === 3
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              Solar Panel
            </button>
            <button
              onClick={() => {
                handleSelectedTab(4);
              }}
              className={
                openTab === 4
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              SCC
            </button>
          </div>
          <div className="block">{tabpanel}</div>
        </div>
      </div>
    </>
  );
};

export default Requests;

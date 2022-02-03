import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";
import SCCComponent from "./SCCComponent";

const SolarPanelSCCTab = ({ pvdata }) => {
  const { solarpanelstab, setPV } = useContext(HomeContext);
  const [itemState, setItemState] = useState(solarpanelstab);
  const [sunhourstate, setshState] = useState(solarpanelstab.sunhours);
  const { pvlist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.pvname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    arrvar.shift();
    for (i; i < pvlist.length; i++) {
      arrvar.push({
        value: pvlist[i].id,
        label: pvlist[i].pvname,
      });
    }
    setOptions(arrvar);
  }, [optionState, pvlist]);

  const handleItemChanged = (event) => {
    let selectedId = event.value;
    let index = pvlist.findIndex((x) => x.id === selectedId);
    let stateSetter = {
      id: pvlist[index].id,
      pvname: pvlist[index].pvname,
      wattage: pvlist[index].wattage,
      brand: pvlist[index].brand,
      voc: pvlist[index].voc,
      imp: pvlist[index].imp,
      price: pvlist[index].price,
      link: pvlist[index].link,
      sunhours: sunhourstate,
    };
    setItemState(stateSetter);
    setPV(stateSetter);
    setSelectedState(event);
  };

  const handleSHChange = (value) => {
    let setstate = itemState;
    setstate.sunhours = 1 * value;
    setshState(value);
    setItemState(setstate);
    console.log(itemState);
    setPV(setstate);
  };

  console.log(pvdata);
  return (
    <>
      {/* <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <div className="content">
                <h4>Solar Panel Name</h4>
                <Select
                  value={selectedState}
                  onChange={handleItemChanged}
                  options={optionState}
                />
              </div>
              <div>
                <label> Sunhours: </label>
                <input
                  id="sunhours"
                  type="number"
                  value={sunhourstate}
                  onChange={(e) => handleSHChange(e.target.value)}
                />
              </div>
              <hr />
              <div>
                <p>Solar Panel Name: {itemState.pvname}</p>
                <p>Wattage: {itemState.wattage}</p>
                <p>PV in Series: {(pvdata.pvseries = pvdata.pvseries || "")}</p>
                <p>
                  PV in Parallel:{" "}
                  {(pvdata.pvparallel = pvdata.pvparallel || "")}
                </p>
                <p>Total Panels: {(pvdata.totalpv = pvdata.totalpv || "")}</p>
                <p>
                  Price per pc.: Php{" "}
                  {numberWithCommas(itemState.price.toFixed(2))}
                </p>
                <p>
                  Total Price:
                  {pvdata.totalprice
                    ? numberWithCommas(pvdata.totalprice.toFixed(2))
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="square">
        <div className="content">
          <div className="table">
            <SCCComponent />
          </div>
        </div>
      </div> */}
      <div className="container-lg px-6 py-4 mx-4">
        <div className="grid grid-cols-1 gap-8 xl:mt-4 md:grid-cols-1 xl:grid-cols-1">
          <div className="grid grid-cols-1 gap-8  md:grid-cols-2 xl:grid-cols-2">
            <div className="grid grid-cols-1 gap-8 xl:mt-4 md:grid-cols-1 xl:grid-cols-1">
              <div>
                <div>
                  <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
                    Select Solar Panel:
                  </label>
                  <Select
                    value={selectedState}
                    onChange={handleItemChanged}
                    options={optionState}
                  />
                </div>
                <div className="mt-2.5">
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="sh"
                  >
                    Sunhours:
                  </label>
                  <input
                    id="sh"
                    type="number"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={sunhourstate}
                    onChange={(e) => handleSHChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 xl:mt-4 md:grid-cols-2 xl:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="pvname"
                  >
                    Solar Panel Name:
                  </label>
                  <input
                    id="pvname"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={itemState.pvname}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="watts"
                  >
                    Wattage:
                  </label>
                  <input
                    id="watts"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={itemState.wattage + " W"}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="pvseries"
                  >
                    PV in Series:
                  </label>
                  <input
                    id="pvseries"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={(pvdata.pvseries = pvdata.pvseries || "")}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="pvparallel"
                  >
                    PV in Parallel:
                  </label>
                  <input
                    id="pvparallel"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={(pvdata.pvparallel = pvdata.pvparallel || "")}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="totalpanel"
                  >
                    Total Panels:
                  </label>
                  <input
                    id="totalpanel"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={(pvdata.totalpv = pvdata.totalpv || "")}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="totalpanel"
                  >
                    Price per pc.:
                  </label>
                  <input
                    id="totalpanel"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={
                      "Php " + numberWithCommas(itemState.price.toFixed(2))
                    }
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 text-lg font-medium dark:text-gray-200"
                    htmlFor="totalprc"
                  >
                    Total Price:
                  </label>
                  <input
                    id="totalprc"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
                    disabled={true}
                    value={
                      pvdata.totalprice
                        ? "Php " +
                          numberWithCommas(pvdata.totalprice.toFixed(2))
                        : "Php 0.00"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <SCCComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarPanelSCCTab;

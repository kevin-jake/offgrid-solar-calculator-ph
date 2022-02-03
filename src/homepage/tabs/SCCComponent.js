import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";

const SCCComponent = () => {
  const { scctab, setSCC } = useContext(HomeContext);
  const [itemState, setItemState] = useState(scctab);
  const { setSCCGlobal } = useContext(GlobalContext);
  const { scclist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.sccname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    arrvar.shift();
    for (i; i < scclist.length; i++) {
      arrvar.push({
        value: scclist[i].id,
        label: scclist[i].sccname,
      });
    }
    setOptions(arrvar);
  }, [optionState, scclist]);

  useEffect(() => {
    const sccinfo = {
      sccname: itemState.sccname,
      type: itemState.type,
      amprating: itemState.amprating,
      price: itemState.price,
    };
    setSCCGlobal(sccinfo);
  }, [itemState]);

  const handleItemChanged = (event) => {
    let selectedId = event.value;
    let index = scclist.findIndex((x) => x.id === selectedId);
    let stateSetter = {
      id: scclist[index].id,
      sccname: scclist[index].sccname,
      supplier: scclist[index].supplier,
      brand: scclist[index].brand,
      type: scclist[index].type,
      amprating: scclist[index].amprating,
      price: scclist[index].price,
    };
    setItemState(stateSetter);
    setSCC(stateSetter);
    setSelectedState(event);
  };

  return (
    <>
      {/* <div>
      <div className="content">
        <h4>SCC Name</h4>
        <Select
          value={selectedState}
          onChange={handleItemChanged}
          options={optionState}
        />
      </div>
      <hr />
      <div>
        <h4>SCC Type: {itemState.type}</h4>
        <p>Ampere Rating: {itemState.amprating}</p>
        <p>Brand: {itemState.brand}</p>
        <p>Price: Php {numberWithCommas(itemState.price.toFixed(2))}</p>
      </div>
    </div> */}
      <div>
        <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
          Select SCC:
        </label>
        <Select
          value={selectedState}
          onChange={handleItemChanged}
          options={optionState}
        />
        <div className="grid grid-cols-1 my-10 gap-8 md:grid-cols-2 xl:grid-cols-2">
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="scctype"
            >
              SCC Type:
            </label>
            <input
              id="scctype"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.type}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="amprating"
            >
              Ampere Rating:
            </label>
            <input
              id="amprating"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.amprating + " A"}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="brand"
            >
              Brand:
            </label>
            <input
              id="brand"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={itemState.brand}
            />
          </div>
          <div>
            <label
              className="text-gray-700 text-lg font-medium dark:text-gray-200"
              htmlFor="price"
            >
              Price:
            </label>
            <input
              id="price"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
              disabled={true}
              value={"Php " + numberWithCommas(itemState.price.toFixed(2))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SCCComponent;

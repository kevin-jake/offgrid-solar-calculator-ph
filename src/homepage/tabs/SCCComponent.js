import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/global-context";
import { HomeContext } from "../context/home-context";
// import { LOVContext } from "../context/lov-context";
import AsyncSelect from "react-select/async";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { numberWithCommas } from "../../shared/util/format";

const SCCComponent = () => {
  const { scctab, setSCC } = useContext(HomeContext);
  const [itemState, setItemState] = useState(scctab);
  const { setSCCGlobal } = useContext(GlobalContext);
  // const { scclist } = useContext(LOVContext);
  const [scclist, setSCCList] = useState([]);
  const { sendRequest } = useHttpClient();

  const [optionState, setOptions] = useState();

  useEffect(() => {
    const fetchSCC = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/scc"
        );
        const options = responseData.sccs.map((i) => ({
          label: i.sccname,
          value: i.id,
        }));
        setOptions(options);
        setSCCList(responseData.sccs);
      } catch (err) {}
    };
    fetchSCC();
    // eslint-disable-next-line
  }, [sendRequest]);

  useEffect(() => {
    const sccinfo = {
      sccname: itemState.sccname,
      type: itemState.type,
      amprating: itemState.amprating,
      price: itemState.price,
    };
    setSCCGlobal(sccinfo);
    // eslint-disable-next-line
  }, [itemState]);

  const filterOptions = (inputValue, array) => {
    return array.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const fetchSCC = async (input, callback) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/scc"
      );
      const options = responseData.sccs.map((i) => ({
        label: i.sccname,
        value: i.id,
      }));
      callback(filterOptions(input, options));
    } catch (err) {}
  };

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
      link: scclist[index].link,
    };
    setItemState(stateSetter);
    setSCC(stateSetter);
  };

  return (
    <>
      <div>
        <label className="text-gray-700 text-lg font-medium dark:text-gray-200">
          Select SCC:
        </label>
        <AsyncSelect
          cacheOptions
          defaultInputValue={itemState.sccname}
          defaultOptions={optionState}
          onChange={handleItemChanged}
          loadOptions={fetchSCC}
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
    </>
  );
};

export default SCCComponent;

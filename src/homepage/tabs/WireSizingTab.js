import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";
import { HomeContext } from "../context/home-context";

const WireSizingTab = () => {
  const { wiresize, setWireSize, overalls } = useContext(HomeContext);
  const [itemState, setItemState] = useState(wiresize);

  // const { batterylist } = useContext(LOVContext);
  // const [optionState, setOptions] = useState();

  // useEffect(() => {
  //   setItemState(wiresize);
  //   // eslint-disable-next-line
  // }, [wiresize]);

  const handleItemChanged = (event) => {
    //   let selectedId = event.value;
    //   let index = batterylist.findIndex((x) => x.id === selectedId);
    //   setItemState(batterylist[index]);
    //   setBattery(batterylist[index]);
  };

  const handleItemDeleted = () => {};
  const handleClick = () => {};

  // console.log(event);
  return (
    <>
      <div className="grid md:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 col-span-2">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                  </tr>
                </thead>
                <tbody>
                  <tr key={"item-1"} className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Solar Panel to SCC
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Select
                        className="block w-full px-4 py-2 mt-2"
                        defaultValue={{
                          value: "DC",
                          label: "DC",
                        }}
                        options={[
                          {
                            value: "DC",
                            label: "DC",
                          },
                          {
                            value: "AC",
                            label: "AC",
                          },
                        ]}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        // value={o.wattage}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "wattage")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        // value={o.wattage}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "wattage")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        // value={o.wattage}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "wattage")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="watthours"
                        type="text"
                        readOnly
                        className="read-only:bg-inherit focus:outline-none"
                        // value={o.watthours}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "watthours")
                        // }
                      />
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <button
                            onClick={(index) => handleItemDeleted(i)}
                            className={
                              i === 0
                                ? "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto"
                                : "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg lg:mt-0 lg:w-auto bg-blue-600 hover:bg-blue-500"
                            }
                            disabled={i === 0}
                          >
                            Delete
                          </button>
                        </td> */}
                  </tr>
                  <tr key={"item-2"} className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {/* <input
                            id="loadname"
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={o.loadname}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "loadname")
                            }
                          /> */}{" "}
                      SCC to Battery
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Select
                        className="block w-full px-4 py-2 mt-2"
                        defaultValue={{
                          value: "DC",
                          label: "DC",
                        }}
                        options={[
                          {
                            value: "DC",
                            label: "DC",
                          },
                          {
                            value: "AC",
                            label: "AC",
                          },
                        ]}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="wattage"
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        // value={o.wattage}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "wattage")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="totalwatts"
                        type="text"
                        readOnly
                        className="read-only:bg-inherit focus:outline-none"
                        // value={o.totalwatts}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "totalwatts")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="ophours"
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        // value={o.ophours}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "ophours")
                        // }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="watthours"
                        type="text"
                        readOnly
                        className="read-only:bg-inherit focus:outline-none"
                        // value={o.watthours}
                        // onChange={(e, index, id) =>
                        //   handleItemChanged(e, i, "watthours")
                        // }
                      />
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <button
                            onClick={(index) => handleItemDeleted(i)}
                            className={
                              i === 0
                                ? "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto"
                                : "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg lg:mt-0 lg:w-auto bg-blue-600 hover:bg-blue-500"
                            }
                            disabled={i === 0}
                          >
                            Delete
                          </button>
                        </td> */}
                  </tr>
                  {/* {itemState.items.map((o, i) => {
                    return (
                      <tr key={"item-" + i} className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="loadname"
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={o.loadname}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "loadname")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="userqty"
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={o.userqty}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "userqty")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="wattage"
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={o.wattage}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "wattage")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="totalwatts"
                            type="text"
                            readOnly
                            className="read-only:bg-inherit focus:outline-none"
                            value={o.totalwatts}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "totalwatts")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="ophours"
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            value={o.ophours}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "ophours")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            id="watthours"
                            type="text"
                            readOnly
                            className="read-only:bg-inherit focus:outline-none"
                            value={o.watthours}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "watthours")
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <button
                            onClick={(index) => handleItemDeleted(i)}
                            className={
                              i === 0
                                ? "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto"
                                : "block px-5 py-2 mt-4 font-medium leading-5 text-center text-white capitalize rounded-lg lg:mt-0 lg:w-auto bg-blue-600 hover:bg-blue-500"
                            }
                            disabled={i === 0}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })} */}
                  {/* <tr className="bg-gray-100 border-b">
                    <td colSpan="3" className="foot text-center">
                      <h3 className="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600">
                        TOTAL
                      </h3>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="overalls"
                        type="text"
                        className="bg-gray-100 focus:outline-none"
                        readOnly
                        value={overalls.totalwatts}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <input
                        id="overalls"
                        type="text"
                        className="bg-gray-100 focus:outline-none"
                        readOnly
                        value={overalls.watthours}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                  </tr> */}
                </tbody>
              </table>
            </div>
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
                          VDI
                        </th>
                        <th
                          scope="col"
                          className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          AWG
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
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Lithium Ion
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          88%
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          LiFePo4
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          90%
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
    </>
  );
};

export default WireSizingTab;

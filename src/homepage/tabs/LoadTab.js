import React, { useContext, useState, useEffect } from "react";
import { HomeContext } from "../context/home-context";

const LoadTab = () => {
  const { loadtab, setLoad } = useContext(HomeContext);
  const [itemState, setItemState] = useState(loadtab.itemState);
  const [overalls, setOveralls] = useState(loadtab.overalls);

  useEffect(() => {
    setItemState(itemState);
    setOveralls(overalls);
    setLoad({ itemState, overalls });
  }, [itemState, overalls]);

  useEffect(() => {
    setItemState(loadtab.itemState);
    setOveralls(loadtab.overalls);
  }, [loadtab.itemState, loadtab.overalls]);

  const handleClick = () => {
    itemState.items.push({
      loadname: "",
      userqty: "",
      wattage: "",
      totalwatts: "",
      ophours: "",
      watthours: "",
    });
    setItemState({
      items: itemState.items,
    });
  };

  const handleItemChanged = (event, i, id) => {
    let items_var = itemState.items;
    items_var[i][id] = event.target.value;

    setItemState({
      items: items_var,
    });

    if (id === "userqty" || id === "wattage" || id === "ophours") {
      computeTotalWatts(
        i,
        itemState.items[i].userqty,
        itemState.items[i].wattage
      );
    }
  };

  const handleItemDeleted = (i) => {
    itemState.items.splice(i, 1);
    setItemState({
      items: itemState.items,
    });

    computeTotals();
  };

  const computeTotalWatts = (i, users, watts) => {
    let totalWatts = users * watts;
    let items_var = itemState.items;
    items_var[i].totalwatts = totalWatts;
    setItemState({
      items: items_var,
    });

    computeWatthours(i, totalWatts, itemState.items[i].ophours);
  };

  const computeWatthours = (i, totalwatts, hours) => {
    let watthours = totalwatts * hours;
    let items_var = itemState.items;
    items_var[i].watthours = watthours;
    setItemState({
      items: items_var,
    });
    computeTotals();
  };

  const computeTotals = () => {
    let items_var = itemState.items;
    let overallscomp = {};
    const reducer = (a, b) => {
      return {
        totalwatts: a.totalwatts + b.totalwatts,
        watthours: a.watthours + b.watthours,
      };
    };
    if (items_var.length > 1) {
      overallscomp = items_var.reduce(reducer);
      console.log(overallscomp);
    } else {
      overallscomp = {
        totalwatts: itemState.items[0].totalwatts,
        watthours: itemState.items[0].watthours,
      };
    }
    setOveralls(overallscomp);
  };

  // console.log(itemState);
  // console.log(overalls);
  return (
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
                    {" "}
                    Load Name{" "}
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    No. of Users
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Wattage
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Total Wattage
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Operating Hours
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Watt-hours
                  </th>
                  <th
                    scope="col"
                    className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemState.items.map((o, i) => {
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
                })}
                <tr className="bg-gray-100 border-b">
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
                </tr>
              </tbody>
            </table>
            <button
              className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
              onClick={handleClick}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadTab;

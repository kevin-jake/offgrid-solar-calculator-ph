import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { HomeContext } from "./context/home-context";

const LoadTab = (props) => {
  const { loadtab, setLoad } = useContext(HomeContext);
  console.log(loadtab);
  const [itemState, setItemState] = useState(loadtab.itemState);

  const [overalls, setOveralls] = useState(loadtab.overalls);

  useEffect(() => {
    setItemState(itemState);
    setOveralls(overalls);
    setLoad({ itemState, overalls });
  }, [itemState, overalls]);

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Load Name</th>
            <th>No. of Users</th>
            <th>Wattage</th>
            <th>Total Wattage</th>
            <th>Operating Hours</th>
            <th>Watt-hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemState.items.map((o, i) => {
            return (
              <tr key={"item-" + i}>
                <td>
                  <input
                    id="loadname"
                    type="text"
                    value={o.loadname}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "loadname")
                    }
                  />
                </td>
                <td>
                  <input
                    id="userqty"
                    type="number"
                    value={o.userqty}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "userqty")
                    }
                  />
                </td>
                <td>
                  <input
                    id="wattage"
                    type="number"
                    value={o.wattage}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "wattage")
                    }
                  />
                </td>
                <td>
                  <input
                    id="totalwatts"
                    type="text"
                    readOnly
                    value={o.totalwatts}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "totalwatts")
                    }
                  />
                </td>
                <td>
                  <input
                    id="ophours"
                    type="number"
                    value={o.ophours}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "ophours")
                    }
                  />
                </td>
                <td>
                  <input
                    id="watthours"
                    type="text"
                    readOnly
                    value={o.watthours}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "watthours")
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={(index) => handleItemDeleted(i)}
                    disabled={i === 0}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="3" className="foot">
              <h3>TOTAL</h3>
            </td>
            <td>
              <input
                id="overalls"
                type="text"
                readOnly
                value={overalls.totalwatts}
              />
            </td>
            <td>
              <div></div>
            </td>
            <td>
              <input
                id="overalls"
                type="text"
                readOnly
                value={overalls.watthours}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
};

export default LoadTab;

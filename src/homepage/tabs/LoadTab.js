import React, { useState } from "react";

const LoadTab = (props) => {
  const [itemState, setItemState] = useState({
    message: "",
    items: [
      {
        loadname: "",
        userqty: "",
        wattage: "",
        totalwatts: "",
        ophours: "",
        watthours: "",
      },
    ],
  });

  const handleClick = () => {
    // var items = itemState.items;

    // itemState.items.push(itemState.message);

    itemState.items.push(itemState.message);
    console.log(itemState);
    setItemState({
      items: itemState.items,
      message: "",
    });
  };

  const handleItemChanged = (event, i, id) => {
    let items_var = itemState.items;
    items_var[i][id] = event.target.value;

    setItemState({
      items: items_var,
      message: itemState.message,
    });
  };

  const handleItemDeleted = (i) => {
    itemState.items.splice(i, 1);
    setItemState({
      items: itemState.items,
      message: itemState.message,
    });
  };

  return (
    <div>
      <table className="">
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
                    type="text"
                    value={o.userqty}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "userqty")
                    }
                  />
                </td>
                <td>
                  <input
                    id="wattage"
                    type="text"
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
                    value={o.totalwatts}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "totalwatts")
                    }
                  />
                </td>
                <td>
                  <input
                    id="ophours"
                    type="text"
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
        </tbody>
      </table>
      <hr />
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
};

export default LoadTab;

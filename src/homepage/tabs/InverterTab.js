import React, { useState } from "react";

const InverterTab = (props) => {
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
            <th>Inverter Name</th>
          </tr>
        </thead>
        <tbody>
          {itemState.items.map((o, i) => {
            return (
              <tr key={"item-" + i}>
                <td>
                  <select
                    id="loadname"
                    value={o.loadname}
                    onChange={(e, index, id) =>
                      handleItemChanged(e, i, "loadname")
                    }
                  >
                    <option>
                      500W Pure Sine Wave Car Power Inverter 12V DC
                    </option>
                    <option>
                      1000W 24V To 220V Car Home Use Pure Sine Wave
                    </option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <div>
        <p>Input Voltage:</p>
        <p>Efficiency:</p>
        <p>Wattage:</p>
        <p>Price:</p>
        <p>Supplier's Link:</p>
      </div>
    </div>
  );
};

export default InverterTab;

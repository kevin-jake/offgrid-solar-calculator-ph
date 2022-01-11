import React, { useEffect, useState } from "react";

const DynamicTable = (props) => {
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

  const updateMessage = (event) => {
    setItemState({ items: itemState.items, message: event.target.value });
  };

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

  //   useEffect(
  //     (i, event) => {
  //       handleItemChanged(i, event);
  //     },
  //     [handleItemChanged]
  //   );

  const handleItemChanged = (i, event) => {
    let items_var = itemState.items;
    // items_var[i] = event.target.value;
    console.log(event);

    setItemState({
      items: items_var,
      message: itemState.message,
    });
  };

  const handleItemDeleted = (i) => {
    setItemState({
      items: itemState.items.splice(i, 1),
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
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <input
                    id="userqty"
                    type="text"
                    value={o.userqty}
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <input
                    id="wattage"
                    type="text"
                    value={o.wattage}
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <input
                    id="totalwatt"
                    type="text"
                    value={o.totalwatt}
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <input
                    id="ophours"
                    type="text"
                    value={o.ophours}
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <input
                    id="watthours"
                    type="text"
                    value={o.watthours}
                    onChange={handleItemChanged}
                  />
                </td>
                <td>
                  <button onClick={handleItemDeleted}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <input type="text" value={itemState.message} onChange={updateMessage} />
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
};

export default DynamicTable;

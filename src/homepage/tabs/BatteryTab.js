import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import "./BatteryTab.css";

const BatteryTab = (props) => {
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
    <>
      <div class="square">
        <div class="content">
          <div class="table">
            <div class="table-cell">
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Name</th>
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
                            <option>EVE 18650 3.2V 50AH</option>
                            <option>32650 6ah</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr />
              <div>
                <p>Battery Type:</p>
                <p>Battery Model / Name:</p>
                <p>Battery Voltage:</p>
                <p>Battery Capacity:</p>
                <p>Price per pc.:</p>
                <p>No. of Battery in Series:</p>
                <p>No. of Battery in Parallel:</p>
                <p>Total No. of Battery:</p>
                <p>Total Price:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="square">
        <div class="content">
          <div class="table">
            <div>
              <p>Battery Size (Ah):</p>
              <p>Battery Model / Name:</p>
              <p>Battery Voltage:</p>
              <p>Battery Capacity:</p>
              <p>Price per pc.:</p>
              <p>No. of Battery in Series:</p>
              <p>No. of Battery in Parallel:</p>
              <p>Total No. of Battery:</p>
              <p>Total Price:</p>
            </div>
          </div>
        </div>
      </div>
      <div class="square">
        <div class="content">
          <div class="table">
            <div>
              <h2>Battery Depth of Discharge (DOD)</h2>
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Type</th>
                    <th>Suggested DOD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lead Acid</td>
                    <td>50%</td>
                  </tr>
                  <tr>
                    <td>Lithium Ion</td>
                    <td>80%</td>
                  </tr>
                  <tr>
                    <td>LiFePo4</td>
                    <td>90%</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h3>True Battery Size Needed considering DOD</h3>
              <div>
                <p>Lead Acid: </p>
                <p>Lithium Ion: </p>
                <p>LiFePo4: </p>
                <p>Total Current Load (A): </p>
                <p>Total DC Watts Input to Inverter (W): </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatteryTab;

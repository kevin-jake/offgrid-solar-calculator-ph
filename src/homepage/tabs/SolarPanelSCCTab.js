import React, { useState } from "react";

const SolarPanelSCCTab = () => {
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
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <table className="">
                <thead>
                  <tr>
                    <th>Inverter Name</th>
                    <th>Sun hours</th>
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
                        <td>
                          <input
                            id="sunhours"
                            value={o.sunhours}
                            onChange={(e, index, id) =>
                              handleItemChanged(e, i, "sunhours")
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr />
              <div>
                <p>Solar Panel Name:</p>
                <p>Wattage:</p>
                <p>PV in Series:</p>
                <p>PV in Parallel:</p>
                <p>Total Panels:</p>
                <p>Price per pc.:</p>
                <p>Total Price:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <table className="">
                <thead>
                  <tr>
                    <th>SCC Name</th>
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
                            <option>SRNE 40A MPPT</option>
                            <option>Epever 60A MPPT</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <hr />
              <div>
                <h3>PWM or MPPT</h3>
                <p>Ampere Rating:</p>
                <p>Price:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarPanelSCCTab;

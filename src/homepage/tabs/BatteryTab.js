import React, { useContext, useState } from "react";
import "./BatteryTab.css";
import { HomeContext } from "./context/home-context";

const BatteryTab = (props) => {
  const { batterytab, setLoad } = useContext(HomeContext);
  const [itemState, setItemState] = useState(batterytab.itemState);

  const dodTable = {
    twelveV: {},
  };

  const handleDropDownChange = (event) => {};

  return (
    <>
      <div className="square">
        <div className="content">
          <div className="table">
            <div className="table-cell">
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        id="batteryname"
                        value={itemState.batteryname}
                        onChange={(e) => handleDropDownChange(e)}
                      >
                        <option>EVE 18650 3.2V 50AH</option>
                        <option>32650 6ah</option>
                      </select>
                    </td>
                  </tr>
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
      <div className="square">
        <div className="content">
          <div className="table">
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
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <h2>Battery Depth of Discharge (DOD)</h2>
              <table className="">
                <thead>
                  <tr>
                    <th>Battery Type</th>
                    <th>Suggested DOD</th>
                    <th>12V system</th>
                    <th>24V system</th>
                    <th>48V system</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h4>Battery Size (Ah)</h4>
                    </td>
                  </tr>
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
                  <tr>
                    <td colSpan={2}>Total Current Load (A)</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total DC Watts Input to Inverter (W)</td>
                  </tr>
                </tbody>
              </table>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatteryTab;

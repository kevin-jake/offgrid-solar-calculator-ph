import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./BatteryTab.css";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";

const BatteryTab = ({ battdata, doddata }) => {
  const { batterytab, setBattery } = useContext(HomeContext);
  const [itemState, setItemState] = useState(batterytab);
  const { batterylist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.battname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    for (i; i < batterylist.length; i++) {
      arrvar.push({
        value: batterylist[i].id,
        label: batterylist[i].battname,
      });
    }
    setOptions(arrvar);
  }, [optionState, batterylist]);

  const handleItemChanged = (event) => {
    // console.log(event);
    let selectedId = event.value;
    let index = batterylist.findIndex((x) => x.id === selectedId);
    // console.log(batterylist[index]);
    setItemState(batterylist[index]);
    setBattery(batterylist[index]);
    setSelectedState(event);
  };
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
                      <Select
                        value={selectedState}
                        onChange={handleItemChanged}
                        options={optionState}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div>
                <p>Battery Type: {itemState.batttype}</p>
                <p>Battery Model / Name: {itemState.battmodel}</p>
                <p>Battery Voltage: {itemState.voltage}</p>
                <p>Battery Capacity: {itemState.battcapacity}</p>
                <p>Price per pc.: {itemState.priceperpc}</p>
                <p>No. of Battery in Series: {battdata.series} </p>
                <p>No. of Battery in Parallel: {battdata.parallel} </p>
                <p>Total No. of Battery: {battdata.totalnumber}</p>
                <p>Total Capacity: {battdata.totalcapacity}</p>
                <p>Total Price: {battdata.totalprice}</p>
              </div>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h4>Battery Size (Ah)</h4>
                    </td>
                    <td>{doddata.leadacid.battcapacity}</td>
                  </tr>
                  <tr>
                    <td>Lead Acid</td>
                    <td>50%</td>
                    <td>{doddata.leadacid.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>Lithium Ion</td>
                    <td>88%</td>
                    <td>{doddata.lion.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>LiFePo4</td>
                    <td>90%</td>
                    <td>{doddata.lifepo.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total Current Load (A)</td>
                    <td>{doddata.lifepo.totalCurrentLoad}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total DC Watts Input to Inverter (W)</td>
                    <td>{doddata.lifepo.totalDCPower}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatteryTab;

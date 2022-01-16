import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./BatteryTab.css";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";

const BatteryTab = (props) => {
  const { loadtab, invertertab, batterytab, setBattery } =
    useContext(HomeContext);
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
  }, [optionState]);

  const batteryComputation = (
    totalkwh,
    totalpower,
    efficiency,
    battDOD,
    voltage
  ) => {
    const inverterPowerNeeded = Math.ceil(
      totalkwh * (1 + (1 - efficiency / 100))
    );
    const battcapacity = Math.ceil(inverterPowerNeeded / voltage);
    const battcapwithDOD = Math.ceil(
      Math.round(battcapacity * (1 + (1 - battDOD)) * 100) / 100
    );
    const totalCurrentLoad = Math.ceil(totalpower / voltage);
    const totalDCPower = totalCurrentLoad * voltage;
    return {
      inverterpower: inverterPowerNeeded,
      battcapacity: battcapacity,
      dodbattcap: battcapwithDOD,
      totalCurrentLoad: totalCurrentLoad,
      totalDCPower: totalDCPower,
    };
  };
  const dodComputation = (voltage, load, inverter) => {
    console.log(load);
    const leadacid = batteryComputation(
      load.watthours,
      load.totalwatts,
      inverter.efficiency,
      0.5,
      voltage
    );
    const lion = batteryComputation(
      load.watthours,
      load.totalwatts,
      inverter.efficiency,
      0.88,
      voltage
    );
    const lifepo = batteryComputation(
      load.watthours,
      load.totalwatts,
      inverter.efficiency,
      0.9,
      voltage
    );
    return { leadacid: leadacid, lion: lion, lifepo: lifepo };
  };

  const seriesParallelCompute = (
    voltage,
    totalcapacity,
    battcapacity,
    battvoltage,
    price
  ) => {
    const series = Math.ceil(voltage / battvoltage);
    const parallel = Math.ceil(totalcapacity / battcapacity);
    const totalnumber = series * parallel;
    const totalprice = totalnumber * price;
    return {
      series: series,
      parallel: parallel,
      totalnumber: totalnumber,
      totalprice: totalprice,
    };
  };

  const dodTable = {
    twelveV: dodComputation(12, loadtab.overalls, invertertab),
    twentyfourV: dodComputation(24, loadtab.overalls, invertertab),
    fortyeightV: dodComputation(48, loadtab.overalls, invertertab),
  };
  let seriesParallelTable = {};
  if (itemState.batttype === "LiFePo4") {
    seriesParallelTable = {
      twelveV: seriesParallelCompute(
        12,
        dodTable.twelveV.lifepo.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      twentyfourV: seriesParallelCompute(
        24,
        dodTable.twentyfourV.lifepo.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      fortyeightV: seriesParallelCompute(
        48,
        dodTable.fortyeightV.lifepo.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
    };
  } else if (itemState.batttype === "Lithium Ion") {
    seriesParallelTable = {
      twelveV: seriesParallelCompute(
        12,
        dodTable.twelveV.lion.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      twentyfourV: seriesParallelCompute(
        24,
        dodTable.twentyfourV.lion.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      fortyeightV: seriesParallelCompute(
        48,
        dodTable.fortyeightV.lion.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
    };
  } else if (itemState.batttype === "Lead Acid") {
    seriesParallelTable = {
      twelveV: seriesParallelCompute(
        12,
        dodTable.twelveV.leadacid.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      twentyfourV: seriesParallelCompute(
        24,
        dodTable.twentyfourV.leadacid.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
      fortyeightV: seriesParallelCompute(
        48,
        dodTable.fortyeightV.leadacid.dodbattcap,
        itemState.battcapacity,
        itemState.voltage,
        itemState.priceperpc
      ),
    };
  }

  console.log(seriesParallelTable);
  const handleItemChanged = (event) => {
    console.log(event);
    let selectedInverterId = event.value;
    let index = batterylist.findIndex((x) => x.id === selectedInverterId);
    console.log(batterylist[index]);
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
              </div>
              <table className="">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>12V system</th>
                    <th>24V system</th>
                    <th>48V system</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h4>No. of Battery in Series:</h4>
                    </td>
                    {seriesParallelTable.twelveV && (
                      <>
                        <td>{seriesParallelTable.twelveV.series}</td>
                        <td>{seriesParallelTable.twentyfourV.series}</td>
                        <td>{seriesParallelTable.fortyeightV.series}</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <h4>No. of Battery in Parallel:</h4>
                    </td>
                    {seriesParallelTable.twelveV && (
                      <>
                        <td>{seriesParallelTable.twelveV.parallel}</td>
                        <td>{seriesParallelTable.twentyfourV.parallel}</td>
                        <td>{seriesParallelTable.fortyeightV.parallel}</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <h4>Total No. of Battery:</h4>
                    </td>
                    {seriesParallelTable.twelveV && (
                      <>
                        <td>{seriesParallelTable.twelveV.totalnumber}</td>
                        <td>{seriesParallelTable.twentyfourV.totalnumber}</td>
                        <td>{seriesParallelTable.fortyeightV.totalnumber}</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <h4>Total Price:</h4>
                    </td>
                    {seriesParallelTable.twelveV && (
                      <>
                        <td>{seriesParallelTable.twelveV.totalprice}</td>
                        <td>{seriesParallelTable.twentyfourV.totalprice}</td>
                        <td>{seriesParallelTable.fortyeightV.totalprice}</td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
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
                    <td>{dodTable.twelveV.leadacid.battcapacity}</td>
                    <td>{dodTable.twentyfourV.leadacid.battcapacity}</td>
                    <td>{dodTable.fortyeightV.leadacid.battcapacity}</td>
                  </tr>
                  <tr>
                    <td>Lead Acid</td>
                    <td>50%</td>
                    <td>{dodTable.twelveV.leadacid.dodbattcap}</td>
                    <td>{dodTable.twentyfourV.leadacid.dodbattcap}</td>
                    <td>{dodTable.fortyeightV.leadacid.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>Lithium Ion</td>
                    <td>88%</td>
                    <td>{dodTable.twelveV.lion.dodbattcap}</td>
                    <td>{dodTable.twentyfourV.lion.dodbattcap}</td>
                    <td>{dodTable.fortyeightV.lion.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>LiFePo4</td>
                    <td>90%</td>
                    <td>{dodTable.twelveV.lifepo.dodbattcap}</td>
                    <td>{dodTable.twentyfourV.lifepo.dodbattcap}</td>
                    <td>{dodTable.fortyeightV.lifepo.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total Current Load (A)</td>
                    <td>{dodTable.twelveV.lifepo.totalCurrentLoad}</td>
                    <td>{dodTable.twentyfourV.lifepo.totalCurrentLoad}</td>
                    <td>{dodTable.fortyeightV.lifepo.totalCurrentLoad}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total DC Watts Input to Inverter (W)</td>
                    <td>{dodTable.twelveV.lifepo.totalDCPower}</td>
                    <td>{dodTable.twentyfourV.lifepo.totalDCPower}</td>
                    <td>{dodTable.fortyeightV.lifepo.totalDCPower}</td>
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

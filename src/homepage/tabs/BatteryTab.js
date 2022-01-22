import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./BatteryTab.css";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";

const BatteryTab = () => {
  const { loadtab, invertertab, batterytab, setBattery } =
    useContext(HomeContext);
  const { voltage, setBatteryCap } = useContext(GlobalContext);
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

  useEffect(() => {
    const batcap = {
      totalcapacity: seriesParallelTable.totalcapacity,
      battinseries: seriesParallelTable.series,
      battinparallel: seriesParallelTable.parallel,
      battvoltage: itemState.voltage,
      battcapacity: itemState.battcapacity,
      battsizeneed: dodTable.leadacid.battcapacity,
      currentload: dodTable.leadacid.totalCurrentLoad,
      powertoinverter: dodTable.leadacid.totalDCPower,
    };
    setBatteryCap(batcap);
    const batterytoSet = batterytab;
    batterytoSet.totalqty = seriesParallelTable.totalnumber;
    batterytoSet.totalcapacity = seriesParallelTable.totalcapacity;
    batterytoSet.totalprice = seriesParallelTable.totalprice;
    setBattery(batterytoSet);
  }, [itemState]);

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
    // console.log(load);
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
    totalcapacity_needed,
    battcapacity,
    battvoltage,
    price
  ) => {
    const series = Math.ceil(voltage / battvoltage);
    const parallel = Math.ceil(totalcapacity_needed / battcapacity);
    const totalnumber = series * parallel;
    const totalprice = totalnumber * price;
    const totalcapacity = Math.round(parallel * battcapacity);
    return {
      series: series,
      parallel: parallel,
      totalnumber: totalnumber,
      totalprice: totalprice,
      totalcapacity: totalcapacity,
    };
  };

  const dodTable = dodComputation(voltage, loadtab.overalls, invertertab);

  let seriesParallelTable = {};
  if (itemState.batttype === "LiFePo4") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.lifepo.dodbattcap,
      itemState.battcapacity,
      itemState.voltage,
      itemState.priceperpc
    );
  } else if (itemState.batttype === "Lithium Ion") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.lion.dodbattcap,
      itemState.battcapacity,
      itemState.voltage,
      itemState.priceperpc
    );
  } else if (itemState.batttype === "Lead Acid") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.leadacid.dodbattcap,
      itemState.battcapacity,
      itemState.voltage,
      itemState.priceperpc
    );
  }

  // console.log(seriesParallelTable);
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
                <p>No. of Battery in Series: {seriesParallelTable.series} </p>
                <p>
                  No. of Battery in Parallel: {seriesParallelTable.parallel}{" "}
                </p>
                <p>Total No. of Battery: {seriesParallelTable.totalnumber}</p>
                <p>Total Capacity: {seriesParallelTable.totalcapacity}</p>
                <p>Total Price: {seriesParallelTable.totalprice}</p>
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
                    <td>{dodTable.leadacid.battcapacity}</td>
                  </tr>
                  <tr>
                    <td>Lead Acid</td>
                    <td>50%</td>
                    <td>{dodTable.leadacid.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>Lithium Ion</td>
                    <td>88%</td>
                    <td>{dodTable.lion.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td>LiFePo4</td>
                    <td>90%</td>
                    <td>{dodTable.lifepo.dodbattcap}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total Current Load (A)</td>
                    <td>{dodTable.lifepo.totalCurrentLoad}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Total DC Watts Input to Inverter (W)</td>
                    <td>{dodTable.lifepo.totalDCPower}</td>
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

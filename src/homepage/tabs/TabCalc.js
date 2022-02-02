import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BatteryTab from "./BatteryTab";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import InverterTab from "./InverterTab";
import LoadTab from "./LoadTab";
import SolarPanelSCCTab from "./SolarPanelSCCTab";

const TabCalc = () => {
  const { loadtab, invertertab, batterytab, setBattery, solarpanelstab } =
    useContext(HomeContext);
  const {
    voltage,
    solarpanel,
    scc,
    setBatteryCap,
    totalbattcapacity,
    setSolarPanel,
    setOverallPrice,
  } = useContext(GlobalContext);
  const [battSPState, setBattSPState] = useState({});
  const [pvState, setPVState] = useState({});
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    batterycomputation(batterytab, dodTable, voltage);
  }, [batterytab, voltage, loadtab]);

  useEffect(() => {
    pvcomputation(totalbattcapacity, solarpanelstab);
  }, [totalbattcapacity, loadtab, solarpanelstab, solarpanelstab.sunhours]);

  useEffect(() => {
    totalPriceCompute(
      solarpanel.totalprice,
      scc.price,
      totalbattcapacity.totalprice,
      invertertab.price
    );
  }, [
    solarpanel.totalprice,
    scc.price,
    totalbattcapacity.totalprice,
    invertertab.price,
  ]);

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

  const pvCompute = (
    batteryvoltage,
    battinseries,
    battinparallel,
    battcapacity,
    sunhours,
    voc,
    imp,
    wattage,
    price
  ) => {
    const totalcapacity =
      (batteryvoltage * battinseries * (battinparallel * battcapacity) * 0.8) /
      sunhours;
    const pvseries = Math.ceil((batteryvoltage * battinseries) / voc);
    const pvparallel = Math.ceil(totalcapacity / voc / imp);
    const totalpv = pvseries * pvparallel;
    const totalwattage = wattage * totalpv;
    const totalprice = Math.round(totalpv * price);
    return {
      pvseries: pvseries,
      pvparallel: pvparallel,
      totalpv: totalpv,
      totalwattage: totalwattage,
      totalprice: totalprice,
    };
  };

  const dodTable = dodComputation(voltage, loadtab.overalls, invertertab);

  const batterycomputation = (batterytab, dodTable, voltage) => {
    let seriesParallelTable = {
      series: 0,
      parallel: 0,
      totalnumber: 0,
      totalprice: 0,
      totalcapacity: 0,
    };
    if (batterytab.batttype === "LiFePo4") {
      seriesParallelTable = seriesParallelCompute(
        voltage,
        dodTable.lifepo.dodbattcap,
        batterytab.battcapacity,
        batterytab.voltage,
        batterytab.priceperpc
      );
    } else if (batterytab.batttype === "Lithium Ion") {
      seriesParallelTable = seriesParallelCompute(
        voltage,
        dodTable.lion.dodbattcap,
        batterytab.battcapacity,
        batterytab.voltage,
        batterytab.priceperpc
      );
    } else if (batterytab.batttype === "Lead Acid") {
      seriesParallelTable = seriesParallelCompute(
        voltage,
        dodTable.leadacid.dodbattcap,
        batterytab.battcapacity,
        batterytab.voltage,
        batterytab.priceperpc
      );
    }
    const battcap = {
      totalcapacity: seriesParallelTable.totalcapacity,
      battinseries: seriesParallelTable.series,
      battinparallel: seriesParallelTable.parallel,
      battvoltage: batterytab.voltage,
      battcapacity: batterytab.battcapacity,
      battsizeneed: dodTable.leadacid.battcapacity,
      currentload: dodTable.leadacid.totalCurrentLoad,
      powertoinverter: dodTable.leadacid.totalDCPower,
      totalprice: seriesParallelTable.totalprice,
    };
    setBatteryCap(battcap);
    const batterytoSet = batterytab;
    batterytoSet.totalqty = seriesParallelTable.totalnumber;
    batterytoSet.totalcapacity = seriesParallelTable.totalcapacity;
    batterytoSet.totalprice = seriesParallelTable.totalprice;
    console.log(batterytoSet);
    setBattery(batterytoSet);
    setBattSPState(seriesParallelTable);
  };

  const pvcomputation = (totalbattcapacity, solarpanelstab) => {
    let pvtable = pvCompute(
      totalbattcapacity.battvoltage,
      totalbattcapacity.battinseries,
      totalbattcapacity.battinparallel,
      totalbattcapacity.battcapacity,
      solarpanelstab.sunhours,
      solarpanelstab.voc,
      solarpanelstab.imp,
      solarpanelstab.wattage,
      solarpanelstab.price
    );

    const pvinfo = {
      pvname: solarpanelstab.pvname,
      pvparallel: pvtable.pvparallel || 0,
      pvseries: pvtable.pvseries || 0,
      totalnumberpv: pvtable.totalpv || 0,
      totalprice: pvtable.totalprice || 0,
    };
    setSolarPanel(pvinfo);
    setPVState(pvtable);
  };

  const totalPriceCompute = (
    pvprice = 0,
    sccprice = 0,
    batteryprice = 0,
    inverterprice = 0,
    others = 0
  ) => {
    let totalPrice = Math.round(
      pvprice + sccprice + batteryprice + inverterprice + others
    );
    setOverallPrice(totalPrice);
  };
  console.log(totalbattcapacity);
  return (
    // <>
    <Tabs selectedTabClassName="tab--selected">
      <TabList className="tab-list">
        <Tab className="tab-style">Load</Tab>
        <Tab className="tab-style">Inverter</Tab>
        <Tab className="tab-style">Battery</Tab>
        <Tab className="tab-style">Solar Panel and SCC</Tab>
      </TabList>

      <TabPanel>
        <div>
          <h2 className="font-medium leading-tight text-2xl mt-4 mb-0">Load</h2>
          <LoadTab />
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <h2 className="font-medium leading-tight text-2xl mt-4 mb-0">
            Inverter
          </h2>
          <InverterTab />
        </div>
      </TabPanel>
      <TabPanel>
        <h2>Battery</h2>
        <BatteryTab battdata={battSPState} doddata={dodTable} />
      </TabPanel>
      <TabPanel>
        <h2>Solar Panel and SCC</h2>
        <SolarPanelSCCTab pvdata={pvState} />
      </TabPanel>
    </Tabs>
    //   <section className="bg-white dark:bg-gray-900">
    //     <div className="container-lg px-6 py-10 mx-4 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
    //       <div className="flex flex-wrap">
    //         <div className="w-full">
    //           <ul
    //             className="flex mb-0 list-none flex-wrap flex-row"
    //             role="tablist"
    //           >
    //             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //               <a
    //                 className={
    //                   "text-xs font-bold uppercase px-5 py-2 my-2 text-sm rounded block leading-normal border-2 border-blue-400 dark:border-blue-300 rounded-xl " +
    //                   (openTab === 1
    //                     ? "text-white bg-blue-600"
    //                     : "text-blue-600 bg-white")
    //                 }
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   setOpenTab(1);
    //                 }}
    //                 data-toggle="tab"
    //                 href="#link1"
    //                 role="tablist"
    //               >
    //                 Load
    //               </a>
    //             </li>
    //             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //               <a
    //                 className={
    //                   "text-xs font-bold uppercase px-5 py-2 my-2 text-sm rounded block leading-normal border-2 border-blue-400 dark:border-blue-300 rounded-xl " +
    //                   (openTab === 2
    //                     ? "text-white bg-blue-600"
    //                     : "text-blue-600 bg-white")
    //                 }
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   setOpenTab(2);
    //                 }}
    //                 data-toggle="tab"
    //                 href="#link2"
    //                 role="tablist"
    //               >
    //                 Inverter
    //               </a>
    //             </li>
    //             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //               <a
    //                 className={
    //                   "text-xs font-bold uppercase px-5 py-2 my-2 text-sm rounded block leading-normal border-2 border-blue-400 dark:border-blue-300 rounded-xl " +
    //                   (openTab === 3
    //                     ? "text-white bg-blue-600"
    //                     : "text-blue-600 bg-white")
    //                 }
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   setOpenTab(3);
    //                 }}
    //                 data-toggle="tab"
    //                 href="#link3"
    //                 role="tablist"
    //               >
    //                 Battery
    //               </a>
    //             </li>
    //             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
    //               <a
    //                 className={
    //                   "text-xs font-bold uppercase px-5 py-2 my-2 text-sm rounded block leading-normal border-2 border-blue-400 dark:border-blue-300 rounded-xl " +
    //                   (openTab === 4
    //                     ? "text-white bg-blue-600"
    //                     : "text-blue-600 bg-white")
    //                 }
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   setOpenTab(4);
    //                 }}
    //                 data-toggle="tab"
    //                 href="#link3"
    //                 role="tablist"
    //               >
    //                 Solar Panel and SCC
    //               </a>
    //             </li>
    //           </ul>
    //           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded border border-blue-400 dark:border-blue-300 rounded-xl">
    //             <div className="px-4 py-5 flex-auto">
    //               <div className="tab-content tab-space">
    //                 <div
    //                   className={openTab === 1 ? "block" : "hidden"}
    //                   id="link1"
    //                 >
    //                   <LoadTab />
    //                 </div>
    //                 <div
    //                   className={openTab === 2 ? "block" : "hidden"}
    //                   id="link2"
    //                 >
    //                   <InverterTab />
    //                 </div>
    //                 <div
    //                   className={openTab === 3 ? "block" : "hidden"}
    //                   id="link3"
    //                 >
    //                   <BatteryTab battdata={battSPState} doddata={dodTable} />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
  );
};

export default TabCalc;

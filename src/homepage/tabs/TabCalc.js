import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BatteryTab from "./BatteryTab";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import InverterTab from "./InverterTab";
import LoadTab from "./LoadTab";
import SolarPanelSCCTab from "./SolarPanelSCCTab";
import {
  dodComputation,
  seriesParallelBattCompute,
  batterycomputation,
  pvcomputation,
  totalPriceCompute,
} from "../Caculations";

const TabCalc = () => {
  const {
    loadtab,
    invertertab,
    batterytab,
    setBattery,
    scctab,
    solarpanelstab,
  } = useContext(HomeContext);
  const {
    voltage,
    solarpanel,
    scc,
    totalbattcapacity,
    overallprice,
    setBatteryCap,
    setSolarPanel,
    setOverallPrice,
  } = useContext(GlobalContext);
  const [battSPState, setBattSPState] = useState({});
  const [pvState, setPVState] = useState({});

  useEffect(() => {
    const battcap = batterycomputation(batterytab, dodTable, voltage);
    const seriesParallelTable = seriesParallelBattCompute(
      batterytab,
      dodTable,
      voltage
    );
    setBatteryCap(battcap);
    const batterytoSet = batterytab;
    batterytoSet.totalqty = seriesParallelTable.totalnumber;
    batterytoSet.totalcapacity = seriesParallelTable.totalcapacity;
    batterytoSet.totalprice = seriesParallelTable.totalprice;
    setBattery(batterytoSet);
    setBattSPState(seriesParallelTable);
  }, [batterytab, voltage, loadtab]);

  useEffect(() => {
    const pvdata = pvcomputation(totalbattcapacity, solarpanelstab);
    console.log(pvdata);
    setSolarPanel(pvdata.pvinfo);
    setPVState(pvdata.pvtable);
  }, [totalbattcapacity, loadtab, solarpanelstab, solarpanelstab.sunhours]);

  useEffect(() => {
    const tp = overallprice;
    tp.twelveV = totalPriceCompute(
      12,
      batterytab,
      dodTable,
      totalbattcapacity,
      solarpanelstab,
      scc.price,
      invertertab,
      loadtab.overalls
    );
    tp.twentyfourV = totalPriceCompute(
      24,
      batterytab,
      dodTable,
      totalbattcapacity,
      solarpanelstab,
      scc.price,
      invertertab,
      loadtab.overalls
    );
    tp.fortyeightV = totalPriceCompute(
      48,
      batterytab,
      dodTable,
      totalbattcapacity,
      solarpanelstab,
      scc.price,
      invertertab,
      loadtab.overalls
    );
    setOverallPrice(tp);
  }, [solarpanelstab.id, scctab.id, batterytab.id, invertertab.id]);

  const dodTable = dodComputation(voltage, loadtab.overalls, invertertab);
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
        <h2 className="font-medium leading-tight text-2xl mt-4 mb-0">
          Battery
        </h2>
        <BatteryTab battdata={battSPState} doddata={dodTable} />
      </TabPanel>
      <TabPanel>
        <h2 className="font-medium leading-tight text-2xl mt-4 mb-0">
          Solar Panel and SCC
        </h2>
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

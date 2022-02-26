import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BatteryTab from "./BatteryTab";
import { GlobalContext } from "../context/global-context";
import { HomeContext } from "../context/home-context";
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
    dodTable,
    seriesParallelTable,
    setDOD,
    setSP,
  } = useContext(HomeContext);
  const {
    voltage,
    scc,
    totalbattcapacity,
    overallprice,
    setSCCGlobal,
    setBatteryCap,
    setSolarPanel,
    setOverallPrice,
  } = useContext(GlobalContext);
  const [pvState, setPVState] = useState({});

  useEffect(() => {
    setSCCGlobal(scctab);
    // eslint-disable-next-line
  }, [scctab]);

  useEffect(() => {
    const dodTabletoSet = dodComputation(
      voltage,
      loadtab.overalls,
      invertertab
    );
    setDOD(dodTabletoSet);
    // eslint-disable-next-line
  }, [voltage, loadtab.overalls.totalwatts, invertertab.id]);

  useEffect(() => {
    const battcap = batterycomputation(batterytab, dodTable, voltage);
    const spToSet = seriesParallelBattCompute(batterytab, dodTable, voltage);
    setBatteryCap(battcap);
    setSP(spToSet);
    // eslint-disable-next-line
  }, [batterytab.id, voltage, dodTable]);

  useEffect(() => {
    const batterytoSet = batterytab;
    batterytoSet.totalqty = seriesParallelTable.totalnumber;
    batterytoSet.totalcapacity = seriesParallelTable.totalcapacity;
    batterytoSet.totalprice = seriesParallelTable.totalprice;
    setBattery(batterytoSet);
    // eslint-disable-next-line
  }, [batterytab.id, voltage, seriesParallelTable]);

  useEffect(() => {
    const pvdata = pvcomputation(totalbattcapacity, solarpanelstab);
    setSolarPanel(pvdata.pvinfo);
    setPVState(pvdata.pvtable);
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [
    solarpanelstab.price,
    scc.price,
    batterytab.totalprice,
    invertertab.price,
  ]);

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
        <BatteryTab battdata={seriesParallelTable} doddata={dodTable} />
      </TabPanel>
      <TabPanel>
        <h2 className="font-medium leading-tight text-2xl mt-4 mb-0">
          Solar Panel and SCC
        </h2>
        <SolarPanelSCCTab pvdata={pvState} />
      </TabPanel>
    </Tabs>
  );
};

export default TabCalc;

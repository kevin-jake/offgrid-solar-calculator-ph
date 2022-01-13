import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BatteryTab from "./BatteryTab";
import InverterTab from "./InverterTab";
import LoadTab from "./LoadTab";
import SolarPanelSCCTab from "./SolarPanelSCCTab";

const TabCalc = () => {
  return (
    <Tabs selectedTabClassName="tab--selected">
      <TabList className="tab-list">
        <Tab className="tab-style">Load</Tab>
        <Tab className="tab-style">Inverter</Tab>
        <Tab className="tab-style">Battery</Tab>
        <Tab className="tab-style">Solar Panel and SCC</Tab>
      </TabList>

      <TabPanel>
        <h2>Load</h2>
        <LoadTab />
      </TabPanel>
      <TabPanel>
        <h2>Inverter</h2>
        <InverterTab />
      </TabPanel>
      <TabPanel>
        <h2>Battery</h2>
        <BatteryTab />
      </TabPanel>
      <TabPanel>
        <h2>Solar Panel and SCC</h2>
        <SolarPanelSCCTab />
      </TabPanel>
    </Tabs>
  );
};

export default TabCalc;

import React, { createContext } from "react";

const inverterlist = [
  {
    id: "i1",
    inverterName: "500W Pure Sine Wave Car Power Inverter 12V DC ",
    type: "PSW",
    inputVoltage: 12,
    efficiency: 90,
    wattage: 500,
    price: 2500,
    img: "",
    link: "https://shopee.ph/300W-500W-Pure-Sine-Wave-Car-Power-Inverter-12V-DC-To-AC-220V-USB-Auto-Power-Inverter-w-USB-Input-i.301705550.4550428304",
  },
  {
    id: "i2",
    inverterName: "1000W 24V To 220V Car Home Use Pure Sine Wave",
    type: "PSW",
    inputVoltage: 24,
    efficiency: 90,
    wattage: 1000,
    price: 2580,
    img: "",
    link: "https://shopee.ph/300W-500W-Pure-Sine-Wave-Car-Power-Inverter-12V-DC-To-AC-220V-USB-Auto-Power-Inverter-w-USB-Input-i.301705550.4550428304",
  },
];

const batterylist = [
  {
    id: "b1",
    battname: "EVE 18650 3.2V 50AH",
    batttype: "Lithium Ion",
    battmodel: "18650",
    voltage: 3.2,
    battcapacity: 50,
    priceperpc: 185,
    img: "",
    link: "Rajiv",
  },
  {
    id: "b2",
    battname: "32650 6ah",
    batttype: "LiFePo4",
    battmodel: "32650",
    voltage: 3.2,
    battcapacity: 6,
    priceperpc: 95,
    img: "",
    link: "https://shopee.ph/32650-lifepo4-battery-6000mAh-3.2V-(PLS-READ-DESCRIPTION)-per-piece-i.45615974.2716937427",
  },
];

const solarpanellist = [
  {
    id: "s1",
    pvname: "100W Solar Mono Crystalline PV Panel - SUNMagnet",
    wattage: 100,
    brand: "Sunmagnet",
    supplier: "Sunmagnet",
    voc: 22.6,
    imp: 5.43,
    vmp: 18.4,
    isc: 5.87,
    price: 2492,
    img: "",
    link: "https://shopee.ph/100W-Solar-Mono-Crystalline-PV-Panel-SUNMagnet-i.311714929.3087822980?sp_atk=79d1a35b-235c-46ea-93d4-8c93b874b966",
  },
  {
    id: "s2",
    pvname: "Ian solar 450w ",
    wattage: 450,
    brand: "IAN Solar",
    supplier: "Ian Solar",
    voc: 49.3,
    imp: 10.85,
    vmp: 41.5,
    isc: 11.6,
    price: 7200,
    img: "",
    link: "https://www.facebook.com/energysolarian",
  },
];

const scclist = [
  {
    id: "sc1",
    sccname: "SRNE 40A MPPT",
    type: "MPPT",
    brand: "SRNE",
    supplier: "Greewatt",
    amprating: 40,
    price: 3600,
    img: "",
    link: "https://www.facebook.com/dennis.greewatt",
  },
  {
    id: "sc2",
    sccname: "PWM Solar Panel Controller 30A",
    type: "PWM",
    brand: "Blue Normal",
    supplier: "Shoppee",
    amprating: 30,
    price: 303,
    img: "",
    link: "https://shopee.ph/PWM-Solar-Panel-Controller-Battery-Charger-Charge-Solar-Controller-Regulator-30A-i.278747456.7650909968?sp_atk=facd5a49-220d-4f08-ab8b-9effac424f5e",
  },
];

export const LOVContext = createContext(
  inverterlist,
  batterylist,
  solarpanellist,
  scclist
);

export const LOVProvider = (props) => {
  const value = {
    inverters: inverterlist,
    batterylist: batterylist,
    pvlist: solarpanellist,
    scclist: scclist,
  };

  console.log(value);
  return (
    <LOVContext.Provider value={value}>{props.children}</LOVContext.Provider>
  );
};

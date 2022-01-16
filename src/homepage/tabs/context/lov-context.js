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
    link: "https://shopee.ph/300W-500W-Pure-Sine-Wave-Car-Power-Inverter-12V-DC-To-AC-220V-USB-Auto-Power-Inverter-w-USB-Input-i.301705550.4550428304",
  },
];

const batterylist = [
  {
    id: "b1",
    battname: "EVE 18650 3.2V 50AH",
    batttype: "Lithium Ion",
    battmodel: "18650",
    voltage: 3.6,
    battcapacity: 3.2,
    priceperpc: 185,
    img: "",
    link: "Rajiv",
  },
  {
    id: "b2",
    battname: "32650 6ah",
    batttype: "LiFePo4",
    battmodel: "32650",
    voltage: 3.6,
    battcapacity: 6,
    priceperpc: 95,
    img: "",
    link: "https://shopee.ph/32650-lifepo4-battery-6000mAh-3.2V-(PLS-READ-DESCRIPTION)-per-piece-i.45615974.2716937427",
  },
];

export const LOVContext = createContext(inverterlist, batterylist);

export const LOVProvider = (props) => {
  const value = {
    inverters: inverterlist,
    batterylist: batterylist,
  };

  return (
    <LOVContext.Provider value={value}>{props.children}</LOVContext.Provider>
  );
};

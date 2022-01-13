import React, { createContext } from "react";

const lists = {
  inverters: [
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
  ],
};

export const LOVContext = createContext(lists);

export const LOVProvider = (props) => {
  const value = {
    inverters: lists.inverters,
  };

  return (
    <LOVContext.Provider value={value}>{props.children}</LOVContext.Provider>
  );
};

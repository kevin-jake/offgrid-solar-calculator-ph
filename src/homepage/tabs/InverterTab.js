import React, { useContext, useState } from "react";
import { HomeContext } from "./context/home-context";
import Select from "react-select";
import { LOVContext } from "./context/lov-context";
import { useEffect } from "react/cjs/react.development";

const InverterTab = (props) => {
  const { invertertab, setInverter } = useContext(HomeContext);
  const { inverters } = useContext(LOVContext);
  const [itemState, setItemState] = useState(invertertab);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.inverterName,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    for (i; i < inverters.length; i++) {
      arrvar.push({
        value: inverters[i].id,
        label: inverters[i].inverterName,
      });
    }
    setOptions(arrvar);
  }, [optionState, inverters]);

  const handleItemChanged = (event) => {
    console.log(event);
    let selectedInverterId = event.value;
    let index = inverters.findIndex((x) => x.id === selectedInverterId);
    console.log(inverters[index]);
    setItemState(inverters[index]);
    setInverter(inverters[index]);
    setSelectedState(event);
  };
  console.log(selectedState);
  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Inverter Name</th>
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
        <p>Inverter Type: {itemState.type}</p>
        <p>Input Voltage: {itemState.inputVoltage} V</p>
        <p>Efficiency: {itemState.efficiency}%</p>
        <p>Wattage: {itemState.wattage} W</p>
        <p>Price: Php {itemState.price} </p>
        <p>Supplier's Link: {itemState.link}</p>
      </div>
    </div>
  );
};

export default InverterTab;

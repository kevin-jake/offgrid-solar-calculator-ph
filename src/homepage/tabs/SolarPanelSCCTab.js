import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";
import SCCComponent from "./SCCComponent";

const SolarPanelSCCTab = ({ pvdata }) => {
  const { solarpanelstab, setPV } = useContext(HomeContext);
  const [itemState, setItemState] = useState(solarpanelstab);
  const [sunhourstate, setshState] = useState(solarpanelstab.sunhours);
  const { pvlist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.pvname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    for (i; i < pvlist.length; i++) {
      arrvar.push({
        value: pvlist[i].id,
        label: pvlist[i].pvname,
      });
    }
    setOptions(arrvar);
  }, [optionState, pvlist]);

  const handleItemChanged = (event) => {
    let selectedId = event.value;
    let index = pvlist.findIndex((x) => x.id === selectedId);
    let stateSetter = {
      id: pvlist[index].id,
      pvname: pvlist[index].pvname,
      wattage: pvlist[index].wattage,
      brand: pvlist[index].brand,
      voc: pvlist[index].voc,
      imp: pvlist[index].imp,
      price: pvlist[index].price,
      link: pvlist[index].link,
      sunhours: sunhourstate,
    };
    setItemState(stateSetter);
    setPV(stateSetter);
    setSelectedState(event);
  };

  const handleSHChange = (value) => {
    let setstate = itemState;
    setstate.sunhours = 1 * value;
    setshState(value);
    setItemState(setstate);
    console.log(itemState);
    setPV(setstate);
  };

  console.log(pvdata);
  return (
    <>
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <div className="content">
                <h4>Solar Panel Name</h4>
                <Select
                  value={selectedState}
                  onChange={handleItemChanged}
                  options={optionState}
                />
              </div>
              <div>
                <label> Sunhours: </label>
                <input
                  id="sunhours"
                  type="number"
                  value={sunhourstate}
                  onChange={(e) => handleSHChange(e.target.value)}
                />
              </div>
              <hr />
              <div>
                <p>Solar Panel Name: {itemState.pvname}</p>
                <p>Wattage: {itemState.wattage}</p>
                <p>PV in Series: {(pvdata.pvseries = pvdata.pvseries || "")}</p>
                <p>
                  PV in Parallel:{" "}
                  {(pvdata.pvparallel = pvdata.pvparallel || "")}
                </p>
                <p>Total Panels: {(pvdata.totalpv = pvdata.totalpv || "")}</p>
                <p>Price per pc.: {itemState.price}</p>
                <p>
                  Total Price: {(pvdata.totalprice = pvdata.totalprice || "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="square">
        <div className="content">
          <div className="table">
            <SCCComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarPanelSCCTab;

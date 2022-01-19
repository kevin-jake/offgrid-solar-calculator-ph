import React, { useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";

const SolarPanelSCCTab = () => {
  const { solarpanelstab, setPV } = useContext(HomeContext);
  const [itemState, setItemState] = useState(solarpanelstab);
  const { totalbattcapacity } = useContext(GlobalContext);
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

  console.log(itemState);
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

  const pvComputation = (
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

  const handleItemChanged = (event) => {
    console.log(event);
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
      sunhours: 0,
    };
    setItemState(stateSetter);
    setPV(stateSetter);
    setSelectedState(event);
  };

  const handleSunhours = (value) => {
    let setstate = itemState;
    setstate.sunhours = value;
    setItemState(setstate);
  };

  let pvtable = pvComputation(
    totalbattcapacity.battvoltage,
    totalbattcapacity.battinseries,
    totalbattcapacity.battinparallel,
    totalbattcapacity.battcapacity,
    itemState.sunhours,
    itemState.voc,
    itemState.imp,
    itemState.wattage,
    itemState.price
  );

  console.log(pvtable);
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
                {/* <label> Sunhours: </label> */}
                <input
                  id="sunhours"
                  type="number"
                  value={itemState.sunhours}
                  onChange={(e) => handleSunhours(e.target.value)}
                />
              </div>
              <hr />
              <div>
                <p>Solar Panel Name: {itemState.pvname}</p>
                <p>Wattage: {itemState.wattage}</p>
                <p>
                  PV in Series: {(pvtable.pvseries = pvtable.pvseries || "")}
                </p>
                <p>
                  PV in Parallel:{" "}
                  {(pvtable.pvparallel = pvtable.pvparallel || "")}
                </p>
                <p>Total Panels: {(pvtable.totalpv = pvtable.totalpv || "")}</p>
                <p>Price per pc.: {itemState.price}</p>
                <p>
                  Total Price: {(pvtable.totalprice = pvtable.totalprice || "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="square">
        <div className="content">
          <div className="table">
            <div>
              <table className="">
                <thead>
                  <tr>
                    <th>SCC Name</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <hr />
              <div>
                <h3>PWM or MPPT</h3>
                <p>Ampere Rating:</p>
                <p>Price:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolarPanelSCCTab;

import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/global-context";
import { HomeContext } from "./context/home-context";
import { LOVContext } from "./context/lov-context";
import Select from "react-select";
import { numberWithCommas } from "../../shared/util/format";

const SCCComponent = () => {
  const { scctab, setSCC } = useContext(HomeContext);
  const [itemState, setItemState] = useState(scctab);
  const { setSCCGlobal } = useContext(GlobalContext);
  const { scclist } = useContext(LOVContext);
  const [optionState, setOptions] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [selectedState, setSelectedState] = useState({
    value: itemState.id,
    label: itemState.sccname,
  });

  useEffect(() => {
    let i = 0;
    let arrvar = optionState;
    for (i; i < scclist.length; i++) {
      arrvar.push({
        value: scclist[i].id,
        label: scclist[i].sccname,
      });
    }
    setOptions(arrvar);
  }, [optionState, scclist]);

  useEffect(() => {
    const sccinfo = {
      sccname: itemState.sccname,
      type: itemState.type,
      amprating: itemState.amprating,
      price: itemState.price,
    };
    setSCCGlobal(sccinfo);
  }, [itemState]);

  const handleItemChanged = (event) => {
    let selectedId = event.value;
    let index = scclist.findIndex((x) => x.id === selectedId);
    let stateSetter = {
      id: scclist[index].id,
      sccname: scclist[index].sccname,
      supplier: scclist[index].supplier,
      brand: scclist[index].brand,
      type: scclist[index].type,
      amprating: scclist[index].amprating,
      price: scclist[index].price,
    };
    setItemState(stateSetter);
    setSCC(stateSetter);
    setSelectedState(event);
  };

  return (
    <div>
      <div className="content">
        <h4>SCC Name</h4>
        <Select
          value={selectedState}
          onChange={handleItemChanged}
          options={optionState}
        />
      </div>
      <hr />
      <div>
        <h4>SCC Type: {itemState.type}</h4>
        <p>Ampere Rating: {itemState.amprating}</p>
        <p>Brand: {itemState.brand}</p>
        <p>Price: Php {numberWithCommas(itemState.price.toFixed(2))}</p>
      </div>
    </div>
  );
};

export default SCCComponent;

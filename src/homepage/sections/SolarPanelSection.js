import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import panel from "../resources/panel.png";
import { GlobalContext } from "../tabs/context/global-context";

const SolarPanelSection = () => {
  const { solarpanel } = useContext(GlobalContext);
  return (
    <>
      <div>
        <h3>Solar Panel </h3>
        <img src={panel} alt="Solar Panel" />
      </div>
      <div>
        <p>Solar Panel Name: {solarpanel.pvname}</p>
        <p>No. of Panels in Parallel: {solarpanel.pvparallel}</p>
        <p>No. of Panels in Series: {solarpanel.pvseries}</p>
        <p>Total No. of Panels: {solarpanel.totalnumberpv}</p>
        <p>
          Total Price: Php {numberWithCommas(solarpanel.totalprice.toFixed(2))}
        </p>
      </div>
    </>
  );
};

export default SolarPanelSection;

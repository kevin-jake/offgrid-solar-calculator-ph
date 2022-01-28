import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import panel from "../resources/panel.png";
import { GlobalContext } from "../tabs/context/global-context";

const SolarPanelSection = () => {
  const { solarpanel } = useContext(GlobalContext);
  return (
    <>
      <div className="price-header">
        <h3 className="title">Solar Panel </h3>
        <img src={panel} alt="Solar Panel" />
      </div>
      <hr />
      <div className="price-body">
        <ul className="features">
          <li>Solar Panel Name: {solarpanel.pvname}</li>
          <li>No. of Panels in Parallel: {solarpanel.pvparallel}</li>
          <li>No. of Panels in Series: {solarpanel.pvseries}</li>
          <li>Total No. of Panels: {solarpanel.totalnumberpv}</li>
          <li>
            Total Price: Php{" "}
            {numberWithCommas(solarpanel.totalprice.toFixed(2))}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SolarPanelSection;

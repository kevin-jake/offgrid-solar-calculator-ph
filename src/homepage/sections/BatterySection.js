import React, { useContext } from "react";
import { numberWithCommas } from "../../shared/util/format";
import bat from "../resources/bat.png";
import { HomeContext } from "../tabs/context/home-context";

const BatterySection = () => {
  const { batterytab } = useContext(HomeContext);
  console.log(batterytab);
  return (
    <>
      <div>
        <h3>Battery</h3>
        <img src={bat} alt="Battery" />
      </div>
      <div>
        <p>Battery Type: {batterytab.batttype}</p>
        <p>Battery Model / Name: {batterytab.battname}</p>
        <p>Battery Voltage: {batterytab.voltage}</p>
        <p>Battery Capacity: {batterytab.battcapacity}</p>
        <p>
          Price per pc.: Php{" "}
          {batterytab.priceperpc &&
            numberWithCommas(batterytab.priceperpc.toFixed(2))}
        </p>
        <p>Total Number of Battery: {batterytab.totalqty}</p>
        <p>Battery Total Capacity: {batterytab.totalcapacity} Ah</p>
        <p>
          Total Price: Php{" "}
          {batterytab.totalprice &&
            numberWithCommas(batterytab.totalprice.toFixed(2))}
        </p>
      </div>
    </>
  );
};

export default BatterySection;

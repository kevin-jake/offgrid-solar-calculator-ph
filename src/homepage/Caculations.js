const battcapacityCompute = (
  totalkwh,
  totalpower,
  efficiency,
  battDOD,
  voltage
) => {
  let eff;
  if (efficiency) {
    eff = 1 - efficiency / 100;
  } else {
    eff = 0;
  }

  const inverterPowerNeeded = Math.ceil(totalkwh * (1 + eff));
  const battcapacity = Math.ceil(inverterPowerNeeded / voltage);
  const battcapwithDOD = Math.ceil(
    Math.round(battcapacity * (1 + (1 - battDOD)) * 100) / 100
  );
  const totalCurrentLoad = Math.ceil(totalpower / voltage);
  const totalDCPower = totalCurrentLoad * voltage;
  return {
    inverterpower: inverterPowerNeeded,
    battcapacity: battcapacity,
    dodbattcap: battcapwithDOD,
    totalCurrentLoad: totalCurrentLoad,
    totalDCPower: totalDCPower,
  };
};
const dodComputation = (voltage, load, inverter) => {
  // console.log(load);
  const leadacid = battcapacityCompute(
    load.watthours,
    load.totalwatts,
    inverter.efficiency,
    0.5,
    voltage
  );
  const lion = battcapacityCompute(
    load.watthours,
    load.totalwatts,
    inverter.efficiency,
    0.88,
    voltage
  );
  const lifepo = battcapacityCompute(
    load.watthours,
    load.totalwatts,
    inverter.efficiency,
    0.9,
    voltage
  );
  return { leadacid: leadacid, lion: lion, lifepo: lifepo };
};

const seriesParallelCompute = (
  voltage,
  totalcapacity_needed,
  battcapacity,
  battvoltage,
  price
) => {
  const series = Math.ceil(voltage / battvoltage);
  const parallel = Math.ceil(totalcapacity_needed / battcapacity);
  const totalnumber = series * parallel;
  const totalprice = totalnumber * price;
  const totalcapacity = Math.round(parallel * battcapacity);
  return {
    series: series,
    parallel: parallel,
    totalnumber: totalnumber,
    totalprice: totalprice,
    totalcapacity: totalcapacity,
  };
};

const pvCompute = (
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
  if (voc === 0 || sunhours === 0) {
    voc = 1;
    batteryvoltage = 0;
    sunhours = 1;
    imp = 1;
  }
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

const seriesParallelBattCompute = (batterytab, dodTable, voltage) => {
  let seriesParallelTable = {
    series: 0,
    parallel: 0,
    totalnumber: 0,
    totalprice: 0,
    totalcapacity: 0,
  };
  if (batterytab.batttype === "LiFePo4") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.lifepo.dodbattcap,
      batterytab.battcapacity,
      batterytab.voltage,
      batterytab.priceperpc
    );
  } else if (batterytab.batttype === "Lithium Ion") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.lion.dodbattcap,
      batterytab.battcapacity,
      batterytab.voltage,
      batterytab.priceperpc
    );
  } else if (batterytab.batttype === "Lead Acid") {
    seriesParallelTable = seriesParallelCompute(
      voltage,
      dodTable.leadacid.dodbattcap,
      batterytab.battcapacity,
      batterytab.voltage,
      batterytab.priceperpc
    );
  }
  return seriesParallelTable;
};

const batterycomputation = (batterytab, dodTable, voltage) => {
  const seriesParallelTable = seriesParallelBattCompute(
    batterytab,
    dodTable,
    voltage
  );
  return {
    totalcapacity: seriesParallelTable.totalcapacity,
    battinseries: seriesParallelTable.series,
    battinparallel: seriesParallelTable.parallel,
    battvoltage: batterytab.voltage,
    battcapacity: batterytab.battcapacity,
    battsizeneed: dodTable.leadacid.battcapacity,
    currentload: dodTable.leadacid.totalCurrentLoad,
    powertoinverter: dodTable.leadacid.totalDCPower,
    totalprice: seriesParallelTable.totalprice,
  };
};

const pvcomputation = (totalbattcapacity, solarpanelstab) => {
  let pvtable = pvCompute(
    totalbattcapacity.battvoltage,
    totalbattcapacity.battinseries,
    totalbattcapacity.battinparallel,
    totalbattcapacity.battcapacity,
    solarpanelstab.sunhours,
    solarpanelstab.voc,
    solarpanelstab.imp,
    solarpanelstab.wattage,
    solarpanelstab.price
  );

  return {
    pvinfo: {
      pvname: solarpanelstab.pvname,
      pvparallel: pvtable.pvparallel || 0,
      pvseries: pvtable.pvseries || 0,
      totalwattage: pvtable.totalwattage || 0,
      totalnumberpv: pvtable.totalpv || 0,
      totalprice: pvtable.totalprice || 0,
    },
    pvtable: pvtable,
  };
};

const totalPriceCompute = (
  voltage,
  batterytab,
  dodTable,
  totalbattcapacity,
  solarpanelstab,
  sccprice = 0,
  invertertab,
  load = 0,
  others = 0
) => {
  const dodtable = dodComputation(voltage, load, invertertab);
  const battcap = batterycomputation(batterytab, dodtable, voltage);
  const pvdata = pvcomputation(totalbattcapacity, solarpanelstab);
  const pvprice = pvdata.pvinfo.totalprice;
  const batteryprice = battcap.totalprice;
  let totalPrice = Math.round(
    pvprice + sccprice + batteryprice + invertertab.price + others
  );
  return totalPrice;
};

export {
  battcapacityCompute,
  dodComputation,
  seriesParallelCompute,
  seriesParallelBattCompute,
  pvCompute,
  batterycomputation,
  pvcomputation,
  totalPriceCompute,
};

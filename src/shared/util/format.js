const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const kiloformat = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(3).replace(/\.0$/, "") + " G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(3).replace(/\.0$/, "") + " M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(3).replace(/\.0$/, "") + " k";
  }
  return num;
};

export { numberWithCommas, kiloformat };

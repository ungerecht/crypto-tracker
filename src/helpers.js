export const formatPercentage = (data) => {
  if (data) {
    return parseFloat(data).toFixed(2) + "%";
  }
  return "?%";
};

export const formatSupply = (data) => {
  if (data) {
    return data.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return "?";
};

export const htmlDecode = (input) => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

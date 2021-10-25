import axios from "axios";

const coinchart = (id) => {
  return axios
    .create({
      baseURL: `https://api.coingecko.com/api/v3/coins/${id}`,
      params: {
        vs_currency: "usd",
        days: 1,
      },
    })
    .get("/market_chart");
};

export default coinchart;

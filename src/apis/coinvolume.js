import axios from "axios";

const coinvolume = (id) => {
  return axios
    .create({
      baseURL: `https://api.coingecko.com/api/v3/coins/${id}`,
      params: {
        vs_currency: "usd",
        days: 0,
        interval: "daily",
      },
    })
    .get("/market_chart");
};

export default coinvolume;

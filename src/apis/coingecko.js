import axios from "axios";

export default axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  params: {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 20,
    sparkline: true,
    price_change_percentage: "24h,7d",
  },
});

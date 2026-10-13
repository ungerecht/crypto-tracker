import axios from "axios";

const instance = axios.create({
   baseURL: `https://api.coingecko.com/api/v3/coins/`,
 });

// CoinGecko now rate-limits keyless requests (HTTP 429), so attach a free Demo key.
// Sent as a query param (not a header) to avoid a CORS preflight request.
const apiKey = process.env.REACT_APP_COINGECKO_KEY;
if (apiKey) {
  instance.interceptors.request.use((config) => {
    config.params = { ...config.params, x_cg_demo_api_key: apiKey };
    return config;
  });
}

export default instance;

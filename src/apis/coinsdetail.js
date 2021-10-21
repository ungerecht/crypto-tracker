import axios from "axios";

const coinsdetail = (id) => {
  return axios
    .create({
      baseURL: `https://api.coingecko.com/api/v3/coins/${id}`,
    })
    .get();
};

export default coinsdetail;

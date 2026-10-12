import axios from "axios";

export default axios.create({
  baseURL: WATCHLISTS_API_URL,
});

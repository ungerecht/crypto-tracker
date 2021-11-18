import axios from "axios";

export default axios.create({
  baseURL: "https://crypto-tracker-json-server.herokuapp.com/watchlists",
});

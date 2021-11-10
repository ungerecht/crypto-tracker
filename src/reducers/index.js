import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import coinsReducer from "./coinsReducer";
import infoReducer from "./infoReducer";

export default combineReducers({
  auth: authReducer,
  page: pageReducer,
  coins: coinsReducer,
  info: infoReducer,
});

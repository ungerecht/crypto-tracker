import { combineReducers } from "redux";
import authReducer from "./authReducer";
import coinsReducer from "./coinsReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  auth: authReducer,
  coins: coinsReducer,
  theme: themeReducer,
});

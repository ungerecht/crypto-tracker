import { combineReducers } from "redux";
import authReducer from "./authReducer";
import coinsReducer from "./coinsReducer";
import themeReducer from "./themeReducer";
import watchlistReducer from "./watchlistReducer";

export default combineReducers({
  auth: authReducer,
  coins: coinsReducer,
  theme: themeReducer,
  watchlist: watchlistReducer,
});

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import coinReducer from "./coinReducer";

export default combineReducers({
  auth: authReducer,
  page: pageReducer,
  coin: coinReducer,
});

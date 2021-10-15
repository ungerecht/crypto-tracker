import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
  auth: authReducer,
  page: pageReducer,
});

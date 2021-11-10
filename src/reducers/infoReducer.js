import { FETCH_GLOBAL_DATA } from "../actions/types";

const INITIAL_STATE = {
  globalData: {},
};

const infoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GLOBAL_DATA:
      return { ...state, globalData: action.payload.data };
    default:
      return state;
  }
};

export default infoReducer;

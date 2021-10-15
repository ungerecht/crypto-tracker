import { FETCH_COINS, SET_ACTIVE, FETCH_MARKET } from "../actions/types";

const INITIAL_STATE = {
  active: 1,
  number: 0,
  coins: [],
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return { ...state, number: action.payload.length };
    case FETCH_MARKET:
      return { ...state, coins: action.payload };
    case SET_ACTIVE:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

export default pageReducer;

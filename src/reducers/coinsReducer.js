import { FETCH_COINS } from "../actions/types";

const INITIAL_STATE = {
  coins: [],
  number: 0,
};

const coinsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return { ...state, coins: action.payload, number: action.payload.length };
    default:
      return state;
  }
};

export default coinsReducer;

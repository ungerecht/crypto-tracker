import { FETCH_COINS, FETCH_COIN_DETAIL } from "../actions/types";

const INITIAL_STATE = {
  coin: {},
  coins: [],
  number: 0,
};

const coinsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COINS:
      return { ...state, coins: action.payload, number: action.payload.length };
    case FETCH_COIN_DETAIL:
      return { ...state, coin: action.payload };
    default:
      return state;
  }
};

export default coinsReducer;

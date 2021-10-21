import { FETCH_COIN_DETAIL } from "../actions/types";

const INITIAL_STATE = {
  coin: {},
};

const coinReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COIN_DETAIL:
      return { ...state, coin: action.payload };
    default:
      return state;
  }
};

export default coinReducer;

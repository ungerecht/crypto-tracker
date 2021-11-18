import { ADD_COIN, REMOVE_COIN, GET_LIST, CLEAR_LIST } from "../actions/types";

const INITIAL_STATE = {
  ids: [],
};

const watchlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state, ids: action.payload.coins };
    case ADD_COIN:
      return { ...state, ids: action.payload.coins };
    case REMOVE_COIN:
      return { ...state, ids: action.payload.coins };
    case CLEAR_LIST:
      return { ...state, ids: [] };
    default:
      return state;
  }
};

export default watchlistReducer;

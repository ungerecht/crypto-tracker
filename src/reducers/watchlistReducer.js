import { ADD_COIN, REMOVE_COIN } from "../actions/types";

const INITIAL_STATE = {
  ids: [],
};

const watchlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COIN:
      return { ...state, ids: [...state.ids, action.payload] };
    case REMOVE_COIN:
      return { ...state, ids: state.ids.filter((id) => id !== action.payload) };
    default:
      return state;
  }
};

export default watchlistReducer;

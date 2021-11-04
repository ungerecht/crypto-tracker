import { SET_ACTIVE, FETCH_PAGE } from "../actions/types";

const INITIAL_STATE = {
  active: 1,
  page: [],
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PAGE:
      return { ...state, page: action.payload };
    case SET_ACTIVE:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

export default pageReducer;

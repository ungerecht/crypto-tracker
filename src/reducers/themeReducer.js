import { LIGHT_THEME } from "../actions/themes";
import { SWITCH_THEME } from "../actions/types";

const INITIAL_STATE = {
  theme: LIGHT_THEME,
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;

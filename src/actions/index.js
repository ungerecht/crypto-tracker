import coingecko from "../apis/coingecko";
import { SIGN_IN, SIGN_OUT, FETCH_COINS, SWITCH_THEME } from "./types";

export const switchTheme = (theme) => {
  return {
    type: SWITCH_THEME,
    payload: theme,
  };
};

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetchCoins = () => async (dispatch) => {
  console.log("fetching coins");
  const response = await coingecko.get("/list");
  dispatch({ type: FETCH_COINS, payload: response.data });
};

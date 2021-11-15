import coingecko from "../apis/coingecko";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_COINS,
  SWITCH_THEME,
  ADD_COIN,
  REMOVE_COIN,
} from "./types";

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
  const response = await coingecko.get("/list");
  dispatch({ type: FETCH_COINS, payload: response.data });
};

export const switchTheme = (theme) => {
  return {
    type: SWITCH_THEME,
    payload: theme,
  };
};

export const addCoin = (id) => {
  return {
    type: ADD_COIN,
    payload: id,
  };
};

export const removeCoin = (id) => {
  return {
    type: REMOVE_COIN,
    payload: id,
  };
};

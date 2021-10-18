import coinslist from "../apis/coinslist";
import coinsmarket from "../apis/coinsmarket";
import { formatCoins } from "../helpers";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_COINS,
  SET_ACTIVE,
  FETCH_MARKET,
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
  const response = await coinslist.get();
  dispatch({ type: FETCH_COINS, payload: response.data });
};

export const fetchMarket = (page) => async (dispatch) => {
  const response = await coinsmarket(page);
  const coins = formatCoins(response.data);
  dispatch({ type: FETCH_MARKET, payload: coins });
  window.scroll(0, 0);
};

export const setActive = (active) => {
  return {
    type: SET_ACTIVE,
    payload: active,
  };
};

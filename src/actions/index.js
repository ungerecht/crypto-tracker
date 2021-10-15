import coinslist from "../apis/coinslist";
import coinsmarket from "../apis/coinsmarket";
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
  console.log("fetching market");
  const response = await coinsmarket(page);
  dispatch({ type: FETCH_MARKET, payload: response.data });
};

export const setActive = (active) => {
  return {
    type: SET_ACTIVE,
    payload: active,
  };
};

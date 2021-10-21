import coinslist from "../apis/coinslist";
import coinsmarket from "../apis/coinsmarket";
import coinsdetail from "../apis/coinsdetail";
import coinvolume from "../apis/coinvolume";
import { formatCoins } from "../helpers";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_COINS,
  SET_ACTIVE,
  FETCH_MARKET,
  FETCH_COIN_DETAIL,
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

export const fetchCoinDetail = (id) => async (dispatch) => {
  const response = await coinsdetail(id);
  const volume = await coinvolume(id);
  response.data.volume_24h = volume.data.total_volumes[0][1];
  dispatch({ type: FETCH_COIN_DETAIL, payload: response.data });
};

export const setActive = (active) => {
  return {
    type: SET_ACTIVE,
    payload: active,
  };
};

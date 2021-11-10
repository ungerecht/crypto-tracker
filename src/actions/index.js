import moment from "moment";
import coingecko from "../apis/coingecko";
import coingeckoglobal from "../apis/coingeckoglobal";
import { concat } from "lodash";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_COINS,
  SET_ACTIVE,
  FETCH_PAGE,
  FETCH_COIN_DETAIL,
  FETCH_GLOBAL_DATA,
} from "./types";

export const fetchGlobalData = () => async (dispatch) => {
  const response = await coingeckoglobal.get();
  dispatch({ type: FETCH_GLOBAL_DATA, payload: response.data });
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
  const response = await coingecko.get("/list");
  dispatch({ type: FETCH_COINS, payload: response.data });
};

export const fetchPage = (page) => async (dispatch) => {
  const response = await coingecko.get("/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page,
      sparkline: true,
      price_change_percentage: "24h,7d,1h",
    },
  });
  dispatch({ type: FETCH_PAGE, payload: response.data });
};

export const fetchCoinDetail = (id) => async (dispatch) => {
  const response = await coingecko.get(id);

  //get 24 hour volume
  const volume_24h = await coingecko.get(`${id}/market_chart/`, {
    params: {
      vs_currency: "usd",
      days: 0,
    },
  });
  response.data.volume_24h = volume_24h.data.total_volumes[0][1];

  //get 6 months of chart price data at hourly intervals
  response.data.chart = {};
  response.data.chart.prices = await buildChart(id);
  dispatch({ type: FETCH_COIN_DETAIL, payload: response.data });
};

export const setActive = (active) => {
  return {
    type: SET_ACTIVE,
    payload: active,
  };
};

const buildChart = async (id) => {
  //to get hourly data from coingecko you have to request data in the range of 90 days
  const today = moment().unix();
  const three_m_ago = moment().subtract(90, "days").unix();
  const six_m_ago = moment().subtract(180, "days").unix();

  //get chart data for last 3 months to today
  const chart_now = await coingecko.get(`${id}/market_chart/range`, {
    params: {
      vs_currency: "usd",
      from: three_m_ago,
      to: today,
    },
  });

  //get chart data for 6 months ago to 3 months ago
  const chart_past = await coingecko.get(`${id}/market_chart/range`, {
    params: {
      vs_currency: "usd",
      from: six_m_ago,
      to: three_m_ago - 1,
    },
  });

  //combine chart data prices
  const chart = concat(chart_past.data.prices, chart_now.data.prices);
  return chart;
};

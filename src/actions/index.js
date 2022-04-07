import coingecko from '../apis/coingecko'
import watchlists from '../apis/watchlists'
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_COINS,
  SWITCH_THEME,
  ADD_COIN,
  REMOVE_COIN,
  GET_LIST,
  CLEAR_LIST,
} from './types'

export const signIn = (userId) => {
  console.log('signin')
  return {
    type: SIGN_IN,
    payload: userId,
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

export const fetchCoins = () => async (dispatch) => {
  const response = await coingecko.get('/list')
  dispatch({ type: FETCH_COINS, payload: response.data })
}

export const switchTheme = (theme) => {
  return {
    type: SWITCH_THEME,
    payload: theme,
  }
}

export const getWatchlist = () => async (dispatch, getState) => {
  const { userId } = getState().auth
  const response = await watchlists.get(userId)
  dispatch({ type: GET_LIST, payload: response.data })
}

export const addCoin = (coin) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const { ids } = getState().watchlist
  const response = await watchlists.patch(`${userId}`, {
    coins: [...ids, coin],
  })
  dispatch({ type: ADD_COIN, payload: response.data })
}

export const removeCoin = (coin) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const { ids } = getState().watchlist
  const response = await watchlists.patch(`${userId}`, {
    coins: [...ids.filter((id) => id !== coin)],
  })
  dispatch({ type: REMOVE_COIN, payload: response.data })
}

export const clearWatchlist = () => {
  return {
    type: CLEAR_LIST,
  }
}

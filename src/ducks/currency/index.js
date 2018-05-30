// @flow

import {takeEvery, put, select, call} from 'redux-saga/effects';
import axios from 'axios';
import {createSelector} from 'reselect';
import {createAction, handleActions, combineActions} from 'redux-actions';
import type {currencyData} from '../currencies/types';
import type {coinData, State} from './types';


/**
 * Constants
 * */

export const moduleName: string = 'currency';

export const SELECT_CURRENCY: 'CURRENCY/SELECT_CURRENCY' = 'CURRENCY/SELECT_CURRENCY';

export const FETCH_CHART_REQUEST: 'CURRENCY/FETCH_CHART_REQUEST' = 'CURRENCY/FETCH_CHART_REQUEST';
export const FETCH_CHART_START: 'CURRENCY/FETCH_CHART_START' = 'CURRENCY/FETCH_CHART_START';
export const FETCH_CHART_SUCCESS: 'CURRENCY/FETCH_CHART_SUCCESS' = 'CURRENCY/FETCH_CHART_SUCCESS';
export const FETCH_CHART_FAIL: 'CURRENCY/FETCH_CHART_FAIL' = 'CURRENCY/FETCH_CHART_FAIL';

export const REFRESH_COIN_REQUEST: 'CURRENCY/REFRESH_COIN_REQUEST' = 'CURRENCY/REFRESH_COIN_REQUEST';
export const REFRESH_COIN_START: 'CURRENCY/REFRESH_COIN_START' = 'CURRENCY/REFRESH_COIN_START';
export const REFRESH_COIN_SUCCESS: 'CURRENCY/REFRESH_COIN_SUCCESS' = 'CURRENCY/REFRESH_COIN_SUCCESS';
export const REFRESH_COIN_FAIL: 'CURRENCY/REFRESH_COIN_FAIL' = 'CURRENCY/REFRESH_COIN_FAIL';


/**
 * Reducer
 * */

export const initialState = {
  data: null,
  chartData: {
    market_cap_by_available_supply: [],
    price_btc: [],
    price_usd: [],
    volume_usd: [],
  },
  chartActiveFilter: 'All',
  progressLoad: false,
  progressReload: false,
  error: null,
};

const currencyReducer = handleActions(
  {
    [SELECT_CURRENCY]: (state: State, action) => ({
      ...state,
      data: action.payload
    }),
    [FETCH_CHART_REQUEST]: (state: State, action) => ({
      ...state,
      chartActiveFilter: action.payload.newFilter
    }),
    [FETCH_CHART_START]: (state: State) => ({
      ...state,
      progressLoad: true
    }),
    [REFRESH_COIN_START]: (state: State) => ({
      ...state,
      progressReload: true
    }),
    [FETCH_CHART_SUCCESS]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      progressReload: false,
      chartData: action.payload.chartData
    }),
    [REFRESH_COIN_SUCCESS]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      progressReload: false,
      data: action.payload.coinData,
      chartData: action.payload.chartData,
    }),
    [combineActions(FETCH_CHART_FAIL, REFRESH_COIN_FAIL)]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      progressReload: false,
      error: action.payload.error
    })
  },
  initialState
);

export default currencyReducer;


/**
 * Selectors
 * */

export const stateSelector = (state: Object): State => state[moduleName];
export const chartDataSelector = createSelector(stateSelector, state => state.chartData.price_usd);


/**
 * Action Creators
 * */

export const fetchChartData = createAction(FETCH_CHART_REQUEST, (coinId, newFilter = 'All') => ({coinId, newFilter}));
export const refreshCoinData = createAction(REFRESH_COIN_REQUEST, (coinId, newFilter = 'All') => ({coinId, newFilter}));
export const selectCurrency = createAction(SELECT_CURRENCY,
  (item: currencyData): coinData => {
    const {id, price_usd, percent_change_24h, market_cap_usd, available_supply} = item;

    let daily_value = item['24h_volume_usd'];

    return { id, price_usd, percent_change_24h, market_cap_usd, available_supply, daily_value }
  }
);


/**
 * Sagas
 * */

function generateRef(coinId, filter) {
  let startInterval: number = 0;

  if (filter === 'All') {
    return {
      method: 'post',
      url: `https://graphs2.coinmarketcap.com/currencies/${coinId}`,
    };
  } else {
    switch (filter) {

      case '3M':
        startInterval = 1000 * 60 * 60 * 24 * 30 * 3;
        break;

      case '1M':
        startInterval = 1000 * 60 * 60 * 24 * 30;
        break;

      case '1W':
        startInterval = 1000 * 60 * 60 * 24 * 7;
        break;

      case '24H':
        startInterval = 1000 * 60 * 60 * 24;
        break;
    }

    return {
      method: 'post',
      url: `https://graphs2.coinmarketcap.com/currencies/${coinId}/${Date.now() - startInterval}/${Date.now()}`,
    };
  }
}

function* fetchChartDataSaga({payload: { coinId, newFilter } }) {
  try {
    const state = yield select(stateSelector);

    if (state.progressLoad || state.progressReload || state.error) return true;

    yield put({type: FETCH_CHART_START});

    const ref = yield call(generateRef, coinId, newFilter);

    const {data} = yield call(axios, ref);

    yield put({
      type: FETCH_CHART_SUCCESS,
      payload: {chartData: data},
    });

  } catch (error) {

    yield put({
      type: FETCH_CHART_FAIL,
      payload: {error},
    });

  }
}

function* refreshCoinDataSaga({ payload }) {
  try {

    const state = yield select(stateSelector);

    if (state.progressLoad || state.progressReload || state.error) return true;

    yield put({type: REFRESH_COIN_START});

    const {coinId, newFilter} = payload;

    const chartRef = yield call(generateRef, coinId, newFilter);

    const {data} = yield call(axios, chartRef);

    const coinRef = {
      method: 'post',
      url: `https://api.coinmarketcap.com/v1/ticker/${coinId}`,
    };

    const response = yield call(axios, coinRef);

    const {id, price_usd, percent_change_24h, market_cap_usd, available_supply} = response.data[0];

    const daily_value = response.data[0]['24h_volume_usd'];

    yield put({
      type: REFRESH_COIN_SUCCESS,
      payload: {
        coinData: {id, price_usd, percent_change_24h, market_cap_usd, available_supply, daily_value},
        chartData: data,
      },
    });

  } catch (error) {

    yield put({
      type: REFRESH_COIN_FAIL,
      payload: {error},
    });

  }
}

export function* currencySaga(): mixed {
  yield takeEvery(FETCH_CHART_REQUEST, fetchChartDataSaga);
  yield takeEvery(REFRESH_COIN_REQUEST, refreshCoinDataSaga);
}

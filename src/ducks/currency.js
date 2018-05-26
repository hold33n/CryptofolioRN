import {all, take, put, select, call} from 'redux-saga/effects';
import {appName} from '../config';
import axios from 'axios';
import {OrderedMap, OrderedSet, Record} from 'immutable';
import {createSelector} from 'reselect';
import {chartDataToImmutable} from './utils';

/**
 * Constants
 * */
export const moduleName = 'currency';
const prefix = `${appName}/${moduleName}`;

export const SELECT_CURRENCY = `${prefix}/SELECT_CURRENCY`;

export const FETCH_CHART_REQUEST = `${prefix}/FETCH_CHART_REQUEST`;
export const FETCH_CHART_START = `${prefix}/FETCH_CHART_START`;
export const FETCH_CHART_SUCCESS = `${prefix}/FETCH_CHART_SUCCESS`;
export const FETCH_CHART_FAIL = `${prefix}/FETCH_CHART_FAIL`;

export const REFRESH_COIN_REQUEST = `${prefix}/REFRESH_COIN_REQUEST`;
export const REFRESH_COIN_START = `${prefix}/REFRESH_COIN_START`;
export const REFRESH_COIN_SUCCESS = `${prefix}/REFRESH_COIN_SUCCESS`;
export const REFRESH_COIN_FAIL = `${prefix}/REFRESH_COIN_FAIL`;


/**
 * Reducer
 * */
export const currencyState = new OrderedMap({
  data: null,
  chartData: new OrderedMap({
    market_cap_by_available_supply: new OrderedSet([]),
    price_btc: new OrderedSet([]),
    price_usd: new OrderedSet([]),
    volume_usd: new OrderedSet([]),
  }),
  chartActiveFilter: 'All',
  progressLoad: false,
  progressReload: false,
  error: null,
});


const coinDataRecord = new Record({
  id: null,
  price_usd: null,
  percent_change_24h: null,
  market_cap_usd: null,
  available_supply: null,
  daily_value: null,
});

const chartDataRecord = new Record({
  time: null,
  price: null,
});


export default function reducer(state = currencyState, action) {
  const {type, payload} = action;

  switch (type) {

    case(SELECT_CURRENCY):
      return state
        .set('data', new coinDataRecord(payload));


    case (FETCH_CHART_REQUEST):
      return state
        .set('chartActiveFilter', payload.newFilter);

    case (FETCH_CHART_START):
      return state
        .set('progressLoad', true);
    // .set('chartData', new OrderedMap({
    //   market_cap_by_available_supply: new OrderedSet([]),
    //   price_btc: new OrderedSet([]),
    //   price_usd: new OrderedSet([]),
    //   volume_usd: new OrderedSet([]),
    // }))

    case (REFRESH_COIN_START):
      return state
        .set('progressReload', true);

    case (FETCH_CHART_SUCCESS):
      return state
        .set('progressLoad', false)
        .set('progressReload', false)
        .set('chartData', chartDataToImmutable(payload.chartData, chartDataRecord));

    case (REFRESH_COIN_SUCCESS):
      return state
        .set('progressLoad', false)
        .set('progressReload', false)
        .set('data', new coinDataRecord(payload.coinData))
        .set('chartData', chartDataToImmutable(payload.chartData, chartDataRecord));

    case (FETCH_CHART_FAIL):
    case (REFRESH_COIN_FAIL):
      return state
        .set('progressLoad', false)
        .set('progressReload', false)
        .set('error', payload.error);

    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const coinDataSelector = createSelector(stateSelector, state => state.get('data').toJS());
export const chartDataSelector = createSelector(stateSelector, state => state.get('chartData').get('price_usd').toJS());
export const chartActiveFilterSelector = createSelector(stateSelector, state => state.get('chartActiveFilter'));
export const progressSelector = createSelector(stateSelector, state => state.get('progressLoad'));
export const progressReloadSelector = createSelector(stateSelector, state => state.get('progressReload'));

/**
 * Action Creators
 * */

export function fetchChartData(coinId, newFilter = 'All') {
  return {
    type: FETCH_CHART_REQUEST,
    payload: {coinId, newFilter},
  };
}

export function refreshCoinData(coinId, newFilter = 'All') {
  return {
    type: REFRESH_COIN_REQUEST,
    payload: {coinId, newFilter},
  };
}

export function selectCurrency({id, price_usd, percent_change_24h, market_cap_usd, available_supply, ...rest}) {

  let daily_value = rest['24h_volume_usd'];

  return {
    type: SELECT_CURRENCY,
    payload: {id, price_usd, percent_change_24h, market_cap_usd, available_supply, daily_value},
  };
}

/**
 * Sagas
 * */

function generateRef(coinId, filter) {
  let startInterval;

  console.log(coinId, filter);


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

function* fetchChartDataSaga() {
  while (true) {
    const action = yield take(FETCH_CHART_REQUEST);

    try {

      const state = yield select(stateSelector);

      if (state.progressLoad || state.progressReload || state.error) continue;

      yield put({type: FETCH_CHART_START});

      const {coinId, newFilter} = action.payload;

      const ref = yield call(generateRef, coinId, newFilter);

      console.log(coinId, 'Ref ::: ', ref);

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
}

function* refreshCoinDataSaga() {
  while (true) {
    const action = yield take(REFRESH_COIN_REQUEST);

    try {

      const state = yield select(stateSelector);

      if (state.progressLoad || state.progressReload || state.error) continue;

      yield put({type: REFRESH_COIN_START});

      const {coinId, newFilter} = action.payload;

      const chartRef = yield call(generateRef, coinId, newFilter);

      console.log('Refresh Ref ::: ', coinId, chartRef);

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
}

export function* saga() {
  yield all([
    fetchChartDataSaga(),
    refreshCoinDataSaga(),
  ]);
}

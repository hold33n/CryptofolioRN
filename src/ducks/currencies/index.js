// @flows

import {all, take, put, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {createSelector} from 'reselect';
import {createAction, handleActions, combineActions} from 'redux-actions';
import type {State} from '../auth/types';


/**
 * Constants
 * */

export const moduleName = 'currencies';

export const FETCH_CURRENCIES_REQUEST: 'FETCH_CURRENCIES_REQUEST' = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_START: 'FETCH_CURRENCIES_START' = 'FETCH_CURRENCIES_START';
export const FETCH_CURRENCIES_SUCCESS: 'FETCH_CURRENCIES_SUCCESS' = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL: 'FETCH_CURRENCIES_FAIL' = 'FETCH_CURRENCIES_FAIL';

export const REFRESH_CURRENCIES_REQUEST: 'REFRESH_CURRENCIES_REQUEST' = 'REFRESH_CURRENCIES_REQUEST';
export const REFRESH_CURRENCIES_START: 'REFRESH_CURRENCIES_START' = 'REFRESH_CURRENCIES_START';
export const REFRESH_CURRENCIES_SUCCESS: 'REFRESH_CURRENCIES_SUCCESS' = 'REFRESH_CURRENCIES_SUCCESS';
export const REFRESH_CURRENCIES_FAIL: 'REFRESH_CURRENCIES_FAIL' = 'REFRESH_CURRENCIES_FAIL';


/**
 * Reducer
 * */

// export const currenciesState = new OrderedMap({
//   currenciesList: new OrderedMap({}),
//   progressLoad: false,
//   progressReload: false,
//   error: null,
// });
//
// const currencyRecord = new Record({
//   id: '',
//   name: '',
//   key: '',
//   symbol: '',
//   rank: '',
//   price_usd: null,
//   percent_change_24h: null,
//   market_cap_usd: null,
//   available_supply: null,
//   ['24h_volume_usd']: null,
// });

export const initialState = {
  currenciesList: [],
  progressLoad: false,
  progressReload: false,
  error: null,
};


// export default function currenciesReducer(state = currenciesState, action) {
//   const {type, payload} = action;
//
//   switch (type) {
//
//     case (FETCH_CURRENCIES_START):
//       return state
//         .set('progressLoad', true);
//
//     case (REFRESH_CURRENCIES_START):
//       return state
//         .set('progressReload', true);
//
//     case (FETCH_CURRENCIES_SUCCESS):
//       return state
//         .set('progressLoad', false)
//         .set('currenciesList', state.get('currenciesList').mergeDeep(arrayToOrderedMap(payload.currenciesList, currencyRecord)));
//
//     case (REFRESH_CURRENCIES_SUCCESS):
//       return state
//         .set('progressReload', false)
//         .set('currenciesList', arrayToOrderedMap(payload.currenciesList, currencyRecord));
//
//     case (FETCH_CURRENCIES_FAIL):
//     case (REFRESH_CURRENCIES_FAIL):
//       return state
//         .set('progressLoad', false)
//         .set('progressReload', false)
//         .set('error', payload.error);
//
//     default:
//       return state;
//   }
// }

const currenciesReducer = handleActions(
  {
    [FETCH_CURRENCIES_START]: (state: State) => ({
      ...state,
      progressLoad: true
    }),
    [REFRESH_CURRENCIES_START]: (state: State) => ({
      ...state,
      progressReload: true
    }),
    [combineActions(FETCH_CURRENCIES_SUCCESS, REFRESH_CURRENCIES_SUCCESS)]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      currenciesList: action.payload.currenciesList
    }),
    [combineActions(FETCH_CURRENCIES_FAIL, REFRESH_CURRENCIES_FAIL)]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      progressReload: false,
      error: action.payload.error,
    })
  },
  initialState
);

export default currenciesReducer;



/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const currenciesSelector = createSelector(stateSelector, state => state.currenciesList);
// export const progressLoadSelector = createSelector(stateSelector, state => state.get('progressLoad'));
// export const progressReloadSelector = createSelector(stateSelector, state => state.get('progressReload'));


/**
 * Action Creators
 * */

// export function fetchCurrencies() {
//   return {
//     type: FETCH_CURRENCIES_REQUEST,
//   };
// }
//
// export function refreshCurrencies() {
//   return {
//     type: REFRESH_CURRENCIES_REQUEST,
//   };
// }

export const fetchCurrencies = createAction(FETCH_CURRENCIES_REQUEST);
export const refreshCurrencies = createAction(REFRESH_CURRENCIES_REQUEST);


/**
 * Sagas
 * */

function* fetchCurrenciesLazySaga() {
  while (true) {
    yield take(FETCH_CURRENCIES_REQUEST);

    try {

      const state = yield select(stateSelector);

      if (state.progressLoad || state.error) continue;

      yield put({type: FETCH_CURRENCIES_START});

      const ref = {
        method: 'post',
        url: 'https://api.coinmarketcap.com/v1/ticker',
        params: {
          limit: 0,
        },
      };

      const {data} = yield call(axios, ref);

      yield put({
        type: FETCH_CURRENCIES_SUCCESS,
        payload: {currenciesList: data.map(el => el.key = el.id)},
      });

    } catch (error) {

      yield put({
        type: FETCH_CURRENCIES_FAIL,
        payload: {error},
      });

    }
  }
}

function* refreshCurrenciesSaga() {
  while (true) {
    yield take(REFRESH_CURRENCIES_REQUEST);

    try {

      const state = yield select(stateSelector);

      if (state.progressLoad || state.error) continue;

      yield put({type: REFRESH_CURRENCIES_START});

      const ref = {
        method: 'post',
        url: 'https://api.coinmarketcap.com/v1/ticker',
        params: {
          limit: 0,
        },
      };

      const {data} = yield call(axios, ref);

      yield put({
        type: REFRESH_CURRENCIES_SUCCESS,
        payload: {currenciesList: data.map(el => el.key = el.id)},
      });

    } catch (error) {

      yield put({
        type: REFRESH_CURRENCIES_FAIL,
        payload: {error},
      });

    }
  }
}

export function* saga() {
  yield all([
    fetchCurrenciesLazySaga(),
    refreshCurrenciesSaga(),
  ]);
}
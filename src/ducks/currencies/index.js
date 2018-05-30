// @flows

import {takeEvery, put, call, select} from 'redux-saga/effects';
import axios from 'axios';
import {createSelector} from 'reselect';
import {createAction, handleActions, combineActions} from 'redux-actions';
import type {State} from '../auth/types';


/**
 * Constants
 * */

export const moduleName = 'currencies';

export const FETCH_CURRENCIES_REQUEST: 'CURRENCIES/FETCH_CURRENCIES_REQUEST' = 'CURRENCIES/FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_START: 'CURRENCIES/FETCH_CURRENCIES_START' = 'CURRENCIES/FETCH_CURRENCIES_START';
export const FETCH_CURRENCIES_SUCCESS: 'CURRENCIES/FETCH_CURRENCIES_SUCCESS' = 'CURRENCIES/FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL: 'CURRENCIES/FETCH_CURRENCIES_FAIL' = 'CURRENCIES/FETCH_CURRENCIES_FAIL';

export const REFRESH_CURRENCIES_REQUEST: 'CURRENCIES/REFRESH_CURRENCIES_REQUEST' = 'CURRENCIES/REFRESH_CURRENCIES_REQUEST';
export const REFRESH_CURRENCIES_START: 'CURRENCIES/REFRESH_CURRENCIES_START' = 'CURRENCIES/REFRESH_CURRENCIES_START';
export const REFRESH_CURRENCIES_SUCCESS: 'CURRENCIES/REFRESH_CURRENCIES_SUCCESS' = 'CURRENCIES/REFRESH_CURRENCIES_SUCCESS';
export const REFRESH_CURRENCIES_FAIL: 'CURRENCIES/REFRESH_CURRENCIES_FAIL' = 'CURRENCIES/REFRESH_CURRENCIES_FAIL';


/**
 * Reducer
 * */

export const initialState: State = {
  currenciesList: [],
  progressLoad: false,
  progressReload: false,
  error: null,
};

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
    [FETCH_CURRENCIES_SUCCESS]: (state: State, action) => ({
      ...state,
      progressLoad: false,
      currenciesList: action.payload.currenciesList
    }),
    [REFRESH_CURRENCIES_SUCCESS]: (state: State, action) => ({
      ...state,
      progressReload: false,
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


/**
 * Action Creators
 * */

export const fetchCurrencies = createAction(FETCH_CURRENCIES_REQUEST);
export const refreshCurrencies = createAction(REFRESH_CURRENCIES_REQUEST);


/**
 * Sagas
 * */

function* fetchCurrenciesLazySaga() {
  try {

    const state = yield select(stateSelector);

    if (state.progressLoad || state.error) return true;

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
      payload: {currenciesList: data.map(el => (
        {
          key: el.id,
          ...el
        }
      ))},
    });

  } catch (error) {

    yield put({
      type: FETCH_CURRENCIES_FAIL,
      payload: {error},
    });

  }
}

function* refreshCurrenciesSaga() {
  try {

    const state = yield select(stateSelector);

    if (state.progressLoad || state.error) return true;

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
      payload: {currenciesList: data.map(el => (
          {
            key: el.id,
            ...el
          }
        ))},
    });

  } catch (error) {

    yield put({
      type: REFRESH_CURRENCIES_FAIL,
      payload: {error},
    });

  }
}

export function* currenciesSaga() {
  yield takeEvery(FETCH_CURRENCIES_REQUEST, fetchCurrenciesLazySaga);
  yield takeEvery(REFRESH_CURRENCIES_REQUEST, refreshCurrenciesSaga);
}
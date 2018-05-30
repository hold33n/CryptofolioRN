// @flow

import type { State } from './types'


/**
 * Constants
 * */

export const moduleName = 'portfolio';

export const CONST_EXAMPLE = 'CONST_EXAMPLE';


/**
 * Reducer
 * */

export const initialState: State = {
  transactionHistory: [],
  starredCoins: [],
  portfolios: [],
  progressLoad: false,
  error: null,
};


/**
 * Selectors
 * */

export const stateSelector = (state: Object) => state[moduleName];


/**
 * Action Creators
 * */

/**
 * Sagas
 * */

export function* saga(): mixed {

}
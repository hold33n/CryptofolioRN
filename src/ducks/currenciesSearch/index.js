// @flow

import {currenciesSelector} from '../currencies/index';
import fuzzysort from 'fuzzysort';
import {createSelector} from 'reselect';
import {createAction, handleActions} from 'redux-actions';
import type {State} from './types';

/**
 * Constants
 * */
export const moduleName = 'currencies-search';

export const ADD_SEARCH_PHRASE: 'ADD_SEARCH_PHRASE' = 'ADD_SEARCH_PHRASE';

export const CLEAR_SEARCH_PHRASE: 'CLEAR_SEARCH_PHRASE' = 'CLEAR_SEARCH_PHRASE';


/**
 * Reducer
 * */

export const initialState = {
  searchPhrase: '',
};

const searchReducer = handleActions(
  {
    [ADD_SEARCH_PHRASE]: (state: State, action) => ({
      searchPhrase: action.payload
    }),
    [CLEAR_SEARCH_PHRASE]: () => initialState,
  },
  initialState
);

export default searchReducer;

/**
 * Selectors
 * */

export const stateSelector = (state: Object) => state[moduleName];
export const searchPhraseSelector = createSelector(stateSelector, state => state.searchPhrase);
export const searchCurrenciesResultsSelector = createSelector(searchPhraseSelector, currenciesSelector, (searchPhrase, currencies) => fuzzysort.go(searchPhrase, currencies,
  {
    limit: 8,
    allowTypo: false,
    keys: ['name', 'symbol'],
  }),
);


/**
 * Action Creators
 * */

export const addSearchPhrase = createAction(ADD_SEARCH_PHRASE);
export const clearSearchPhrase = createAction(CLEAR_SEARCH_PHRASE);


/**
 * Sagas
 * */

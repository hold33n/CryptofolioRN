import {Record} from 'immutable'
import {appName} from '../config'
import {currenciesSelector} from './currencies'
import fuzzysort from 'fuzzysort'
import {createSelector} from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'currencies-search'
const prefix = `${appName}/${moduleName}`

export const ADD_SEARCH_PHRASE = `${prefix}/ADD_SEARCH_PHRASE`

export const CLEAR_SEARCH_PHRASE = `${prefix}/CLEAR_SEARCH_PHRASE`


/**
 * Reducer
 * */
export const ReducerRecord = Record({
  searchPhrase: '',
})

export default function searchReducer(state = new ReducerRecord(), action) {
  const {type, payload} = action

  switch (type) {

  case (ADD_SEARCH_PHRASE):
    return state
      .set('searchPhrase', payload.text)

  case (CLEAR_SEARCH_PHRASE):
    return state
      .set('searchPhrase', '')

  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const searchPhraseSelector = createSelector(stateSelector, state => state.get('searchPhrase'))
export const searchCurrenciesResultsSelector = createSelector( searchPhraseSelector, currenciesSelector, (searchPhrase, currencies) => fuzzysort.go(searchPhrase, currencies,
  {
    limit: 8,
    allowTypo: false,
    keys: ['name', 'symbol'],
  })
)

/**
 * Action Creators
 * */


export function addSearchPhrase(text) {
  return {
    type: ADD_SEARCH_PHRASE,
    payload: { text }
  }
}

export function clearSearchPhrase() {
  return {
    type: CLEAR_SEARCH_PHRASE
  }
}

/**
 * Sagas
 * */

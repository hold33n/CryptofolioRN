import {all} from 'redux-saga/effects'
import {appName} from 'config'
import {OrderedMap} from 'immutable'
import {createSelector} from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'navigator'
const prefix = `${appName}/${moduleName}`

export const NAVIGATE = `${prefix}/NAVIGATE`


/**
 * Reducer
 * */
const initialState = new OrderedMap({
  path: '',
});



export default function navigatorReducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {

  case (NAVIGATE):
    return state
      .set('path', payload.path)

  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]

/**
 * Action Creators
 * */

export function navigate(path) {
  return {
    type: NAVIGATE,
    payload: {
      path
    }
  }
}



/**
 * Sagas
 * */

export function* saga() {
  yield all([])
}
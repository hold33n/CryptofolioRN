// @flow

import { createAction, handleActions } from 'redux-actions';
import type { State } from './types';

/**
 * Constants
 * */

export const moduleName: string = 'navigator';

export const NAVIGATE: 'NAVIGATOR/NAVIGATE' = 'NAVIGATOR/NAVIGATE';

/**
 * Reducer
 * */

const initialState = {
  path: '',
};

const navigatorReducer = handleActions(
  {
    [NAVIGATE]: (state: State, action) => ({
      path: action.payload.path,
    }),
  },
  initialState,
);

export default navigatorReducer;

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const navigate = createAction(NAVIGATE, path => ({ path }));

/**
 * Sagas
 * */

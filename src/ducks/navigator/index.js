// @flow

import { createAction, handleActions } from 'redux-actions';
import type { State } from './types';
import { RootNavigator } from 'navigators/RootNavigator';
import { NavigationActions } from 'react-navigation';

/**
 * Constants
 * */

export const moduleName: string = 'navigator';

export const NAVIGATE: 'NAVIGATOR/NAVIGATE' = 'NAVIGATOR/NAVIGATE';
export const NAVIGATE_BACK: 'NAVIGATOR/NAVIGATE_BACK' = 'NAVIGATOR/NAVIGATE_BACK';

/**
 * Reducer
 * */

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('CurrenciesListScreen'),
);

const navigatorReducer = handleActions(
  {
    [NAVIGATE]: (state: State, action) =>
      RootNavigator.router.getStateForAction(
        RootNavigator.router.getActionForPathAndParams(
          action.payload.screenName,
          action.payload.props,
        ),
      ),
    [NAVIGATE_BACK]: (state: State, action) =>
      RootNavigator.router.getStateForAction(NavigationActions.back()),
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

// export const navigate = createAction(NAVIGATE, path => ({ path }));

/**
 * Sagas
 * */

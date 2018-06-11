// @flow
/**
 * Constants
 * */

export const moduleName: string = 'navigator';

export const NAVIGATE: 'NAVIGATOR/NAVIGATE' = 'NAVIGATOR/NAVIGATE';
export const NAVIGATE_BACK: 'NAVIGATOR/NAVIGATE_BACK' = 'NAVIGATOR/NAVIGATE_BACK';

/**
 * Reducer
 * */

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const navigate = (routeName: string, params?: Object) => ({
  type: 'Navigation/NAVIGATE',
  routeName,
  params,
});

/**
 * Sagas
 * */

// @flow


export type path =
  | 'appRoot'
  | 'auth';

export type State = {|
  +path: path
|};
// @flow

import { SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
  SIGN_UP_REQUEST, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAIL,
  SIGN_OUT_REQUEST, SIGN_OUT_START, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL,
  TOGGLE_FORM_STATE_REQUEST, TOGGLE_FORM_STATE_START, TOGGLE_FORM_STATE_SUCCESS, TOGGLE_FORM_STATE_FAIL } from './index';


export type UserReq =  {|
  email: string,
  password: string,
|};

export type User = {|
  email: string,
  id: string
|};


export type State = {|
  +formState: 'SignIn' | 'SignUp',
  +progress: boolean,
  +error: null | string,
|};


export type Action =
  | {| +type: typeof SIGN_IN_REQUEST,
      payload: UserReq
    |}
  | {| +type: typeof SIGN_IN_START |}
  | {| +type: typeof SIGN_IN_SUCCESS,
      payload: {
        user: User
      }
    |}
  | {| +type: typeof SIGN_IN_FAIL,
      payload: {
        error: string
      }
    |}
  | {| +type: typeof SIGN_UP_REQUEST,
      payload: UserReq
    |}
  | {| +type: typeof SIGN_UP_START |}
  | {| +type: typeof SIGN_UP_SUCCESS,
      payload: {
        user: User
      }
    |}
  | {| +type: typeof SIGN_UP_FAIL,
      payload: {
        error: string
      }
    |}
  | {| +type: typeof SIGN_OUT_REQUEST |}
  | {| +type: typeof SIGN_OUT_START |}
  | {| +type: typeof SIGN_OUT_SUCCESS |}
  | {| +type: typeof SIGN_OUT_FAIL,
      payload: {
        error: string
      }
    |}
  | {| +type: typeof TOGGLE_FORM_STATE_REQUEST |}
  | {| +type: typeof TOGGLE_FORM_STATE_START |}
  | {| +type: typeof TOGGLE_FORM_STATE_SUCCESS,
      payload: {
        formState: 'SignIn' | 'SignUp'
      }
    |}
  | {| +type: typeof TOGGLE_FORM_STATE_FAIL,
      payload: {
        error: string
      }
    |};

// @flow

import {all, take, put, call, select} from 'redux-saga/effects'
import {appName, baseURL} from 'config'
import {NAVIGATE} from '../navigator'
import axios from 'axios'
import {createSelector} from 'reselect'
import {OrderedMap} from 'immutable'
import type {AuthAction} from './types'

/**
 * Constants
 * */
export const moduleName: string = 'auth'
const prefix: string = `${appName}/${moduleName}`


export const SIGN_IN_REQUEST: string = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START: string = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS: string = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_FAIL: string = `${prefix}/SIGN_IN_FAIL`

export const SIGN_UP_REQUEST: string = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START: string = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS: string = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_FAIL: string  = `${prefix}/SIGN_UP_FAIL`

export const SIGN_OUT_REQUEST: string = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_START: string = `${prefix}/SIGN_OUT_START`
export const SIGN_OUT_SUCCESS: string = `${prefix}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_FAIL: string = `${prefix}/SIGN_OUT_FAIL`

export const TOGGLE_FORM_STATE_REQUEST: string = `${prefix}/TOGGLE_FORM_STATE_REQUEST`
export const TOGGLE_FORM_STATE_START: string = `${prefix}/TOGGLE_FORM_STATE_START`
export const TOGGLE_FORM_STATE_SUCCESS: string = `${prefix}/TOGGLE_FORM_STATE_SUCCESS`
export const TOGGLE_FORM_STATE_FAIL: string = `${prefix}/TOGGLE_FORM_STATE_FAIL`


/**
 * Reducer
 * */
export const AuthState = new OrderedMap({
  formState: 'SignIn',
  user: null,
  progress: false,
  error: null,
})




export default function authReducer(state: any = AuthState, action: AuthAction) {
  const { type, payload } = action

  switch (type) {

  case (SIGN_IN_START):
  case (SIGN_UP_START):
  case (SIGN_OUT_START):
    return state
      .set('progress', true)
      .set('error', null)

  case (SIGN_IN_SUCCESS):
  case (SIGN_UP_SUCCESS):
    return state
      .set('progress', false)
      .set('error', null)
      .set('user', payload.user)

  case (SIGN_OUT_SUCCESS):
    return state
      .set('progress', false)
      .set('error', null)
      .set('user', null)

  case ('cryptofolio/auth/TOGGLE_FORM_STATE_SUCCESS'):
    return state
      .set('progress', false)
      .set('error', null)
      .set('formState', payload.formState)

  case (SIGN_IN_FAIL):
  case (SIGN_UP_FAIL):
  case (SIGN_OUT_FAIL):
    return state
      .set('progress', false)
      .set('error', payload.error)

  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state: any) => state[moduleName]
export const userSelector = createSelector(stateSelector, state => state.get('user') )
export const progressSelector = createSelector(stateSelector, state => state.get('progress'))
export const errorSelector = createSelector(stateSelector, state => state.get('error'))
export const formStateSelector = createSelector(stateSelector, state => state.get('formState'))

/**
 * Action Creators
 * */

export function signIn(email: string, password: string): AuthAction {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email: string, password: string): AuthAction {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export function signOut(email: string, password: string): AuthAction {
  return {
    type: SIGN_OUT_REQUEST,
    payload: { email, password }
  }
}

export function toggleFormState() {
  return {
    type: TOGGLE_FORM_STATE_REQUEST,
  }
}


/**
 * Sagas
 * */

function* signInSaga() {
  while (true) {
    const action = yield take(SIGN_IN_REQUEST)

    const { email, password } = action.payload

    const state = yield select(stateSelector)

    if (state.get('progress')) continue

    yield put({ type: SIGN_IN_START })

    try {

      const signInRef = {
        method: 'post',
        url: '/sign-in',
        baseURL,
        data: {
          email,
          password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }

      console.log('sss :: ', signInRef)


      const {
        data : {
          user
        }
      } = yield call(axios, signInRef)

      console.log(user)


      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })

      yield put({
        type: NAVIGATE,
        payload: {path: 'appRoot'}
      })


    } catch(error) {
      // let error
      //
      // if (code === 'auth/wrong-password') {
      //   error = 'Invalid password.'
      // } else if (code === 'auth/user-not-found') {
      //   error = 'User not found.'
      // } else {
      //   error = message
      // }

      yield put({
        type: SIGN_IN_FAIL,
        payload: { error }
      })
    }
  }
}

function* signUpSaga() {
  while (true) {
    const action = yield take(SIGN_UP_REQUEST)

    const { email, password } = action.payload

    const state = yield select(stateSelector)

    if (state.get('progress')) continue

    yield put({ type: SIGN_UP_START })

    try {

      const signUpRef = {
        method: 'post',
        url: '/sign-up',
        baseURL,
        data: {
          email,
          password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const {
        data : {
          user
        }
      } = yield call(axios, signUpRef)

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })

      yield put({
        type: NAVIGATE,
        payload: {path: 'appRoot'}
      })

    } catch(error) {

      // let error
      //
      // if (code === 'auth/weak-password') {
      //   error = 'The password is too weak.'
      // } else {
      //   error = message
      // }

      yield put({
        type: SIGN_IN_FAIL,
        payload: { error: error.message }
      })
    }
  }
}

function* signOutSaga() {
  while(true) {
    yield take(SIGN_OUT_REQUEST)

    const state = yield select(stateSelector)

    if (state.get('progress') || state.get('error')) continue

    yield put({ type: SIGN_OUT_START })

    try {


      yield put({ type: SIGN_OUT_SUCCESS })

      yield put({
        type: NAVIGATE,
        payload: {path: 'auth'}
      })

    } catch (error) {
      yield put({
        type: SIGN_OUT_FAIL,
        payload: {error}
      })
    }
  }
}

function* toggleFormStateSaga() {
  while(true) {
    yield take(TOGGLE_FORM_STATE_REQUEST)

    const state = yield select(stateSelector)

    if (state.get('progress')) continue

    yield put({ type: TOGGLE_FORM_STATE_START })

    try {

      if (state.get('formState') === 'SignUp') {
        yield put({
          type: TOGGLE_FORM_STATE_SUCCESS,
          payload: {
            formState: 'SignIn'
          }
        })
      } else {
        yield put({
          type: TOGGLE_FORM_STATE_SUCCESS,
          payload: {
            formState: 'SignUp'
          }
        })
      }

    } catch (error) {
      yield put({
        type: TOGGLE_FORM_STATE_FAIL,
        payload: {error}
      })
    }
  }
}


export function* saga(): any {
  yield all([
    signInSaga(),
    signUpSaga(),
    signOutSaga(),
    toggleFormStateSaga(),
  ])
}
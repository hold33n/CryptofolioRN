import {all, take, put, call, select} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {appName} from '../config'
import {NAVIGATE} from './navigator'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {OrderedMap} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`


export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_FAIL = `${prefix}/SIGN_IN_FAIL`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_FAIL  = `${prefix}/SIGN_UP_FAIL`

export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_START = `${prefix}/SIGN_OUT_START`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_FAIL = `${prefix}/SIGN_OUT_FAIL`

export const TOGGLE_FORM_STATE_REQUEST = `${prefix}/TOGGLE_FORM_STATE_REQUEST`
export const TOGGLE_FORM_STATE_START = `${prefix}/TOGGLE_FORM_STATE_START`
export const TOGGLE_FORM_STATE_SUCCESS = `${prefix}/TOGGLE_FORM_STATE_SUCCESS`
export const TOGGLE_FORM_STATE_FAIL = `${prefix}/TOGGLE_FORM_STATE_FAIL`


/**
 * Reducer
 * */
export const AuthState = new OrderedMap({
  formState: 'SignIn',
  user: null,
  progress: false,
  error: null,
})

export default function authReducer(state = AuthState, action) {
  const { type, payload } = action

  switch (type) {
    
  case (SIGN_IN_START):
  case (SIGN_UP_START):
  case (SIGN_OUT_START):
    return state
      .set('progress', true)
      .set('error', null)

  case (SIGN_IN_SUCCESS):
    return state
      .set('progress', false)
      .set('error', null)
      .set('user', payload.user)

  case (SIGN_OUT_SUCCESS):
    return state
      .set('progress', false)
      .set('error', null)
      .set('user', null)

  case (TOGGLE_FORM_STATE_SUCCESS):
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
export const stateSelector = state => state[moduleName]
export const userSelector = createSelector(stateSelector, state => state.get('user') )
export const progressSelector = createSelector(stateSelector, state => state.get('progress'))
export const errorSelector = createSelector(stateSelector, state => state.get('error'))
export const formStateSelector = createSelector(stateSelector, state => state.get('formState'))

/**
 * Action Creators
 * */

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export function signOut(email, password) {
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

      const auth = firebase.auth()

      yield call([auth, auth.signInAndRetrieveDataWithEmailAndPassword], email, password)


    } catch({ code, message }) {
      let error

      if (code === 'auth/wrong-password') {
        error = 'Invalid password.'
      } else if (code === 'auth/user-not-found') {
        error = 'User not found.'
      } else {
        error = message
      }

      yield put({
        type: SIGN_IN_FAIL,
        payload: { error, code }
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

      const auth = firebase.auth()

      yield call([auth, auth.createUserWithEmailAndPassword], email, password)

      yield put({ type: SIGN_UP_SUCCESS })


    } catch({ code, message }) {

      let error

      if (code === 'auth/weak-password') {
        error = 'The password is too weak.'
      } else {
        error = message
      }

      yield put({
        type: SIGN_IN_FAIL,
        payload: { error }
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

      const auth = firebase.auth()

      yield call([auth, auth.signOut])

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

const createAuthChannel = () => eventChannel(emit => firebase.auth().onAuthStateChanged(user => emit({ user })))

function* watchStatusChangeSaga () {
  try {

    const chan = yield call(createAuthChannel)
    while (true) {
      const {user} = yield take(chan)

      if (user) {
        yield put({
          type: SIGN_IN_SUCCESS,
          payload: {user}
        })

        yield put({
          type: NAVIGATE,
          payload: {path: 'appRoot'}
        })

      } else {
        // yield put({
        //   type: SIGN_IN_FAIL,
        //   payload: { error: 'Email or password are not valid' }
        // })
      }
    }

  } catch(error) {
    console.log(error)
  }
}

export function* saga() {
  yield all([
    signInSaga(),
    signUpSaga(),
    signOutSaga(),
    toggleFormStateSaga(),
    watchStatusChangeSaga(),
  ])
}
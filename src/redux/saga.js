import {all} from 'redux-saga/effects'
import {saga as authSaga} from 'ducks/auth/index'
import {saga as currenciesSaga} from 'ducks/currencies'
import {saga as currencySaga} from 'ducks/currency'

export default function* saga() {
  yield all([
    authSaga(),
    currenciesSaga(),
    currencySaga(),
  ])
}
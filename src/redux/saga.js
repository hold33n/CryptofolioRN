import {all} from 'redux-saga/effects'
import {watchAuth} from 'ducks/auth/index'
import {saga as currenciesSaga} from 'ducks/currencies/index'
import {saga as currencySaga} from 'ducks/currency'

export default function* saga() {
  yield all([
    watchAuth(),
    currenciesSaga(),
    currencySaga(),
  ])
}
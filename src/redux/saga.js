import {all} from 'redux-saga/effects'
import {watchAuth} from 'ducks/auth/index'
import {currenciesSaga} from 'ducks/currencies/index'
import {currencySaga} from 'ducks/currency/index'

export default function* saga() {
  yield all([
    watchAuth(),
    currenciesSaga(),
    currencySaga(),
  ])
}
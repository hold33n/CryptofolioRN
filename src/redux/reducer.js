

import {combineReducers} from 'redux'
import navigatorReducer, {moduleName as navigatorModule} from 'ducks/navigator/index'
import authReducer, {moduleName as authModule} from 'ducks/auth/index'
import currenciesReducer, {moduleName as currenciesModule} from 'ducks/currencies/index'
import currencyReducer, {moduleName as currencyModule} from 'ducks/currency/index'
import searchReducer, {moduleName as searchModule} from 'ducks/currenciesSearch/index'

export default combineReducers({
  [navigatorModule]: navigatorReducer,
  [authModule]: authReducer,
  [currenciesModule]: currenciesReducer,
  [currencyModule]: currencyReducer,
  [searchModule]: searchReducer,
})

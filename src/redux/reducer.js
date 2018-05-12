import {combineReducers} from 'redux'
import navigatorReducer, {moduleName as navigatorModule} from 'ducks/navigator'
import authReducer, {moduleName as authModule} from 'ducks/auth/index'
import currenciesReducer, {moduleName as currenciesModule} from 'ducks/currencies'
import currencyReducer, {moduleName as currencyModule} from 'ducks/currency'
import searchReducer, {moduleName as searchModule} from 'ducks/currenciesSearch'

export default combineReducers({
  [navigatorModule]: navigatorReducer,
  [authModule]: authReducer,
  [currenciesModule]: currenciesReducer,
  [currencyModule]: currencyReducer,
  [searchModule]: searchReducer,
})

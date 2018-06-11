import { combineReducers } from 'redux';
// import navigatorReducer, { moduleName as navigatorModule } from 'ducks/navigator/index';
import authReducer, { moduleName as authModule } from 'ducks/auth/index';
import currenciesReducer, { moduleName as currenciesModule } from 'ducks/currencies/index';
import currencyReducer, { moduleName as currencyModule } from 'ducks/currency/index';
import searchReducer, { moduleName as searchModule } from 'ducks/currenciesSearch/index';
import { AppNavigator } from 'navigators/RootNavigator';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

const navReducer = createNavigationReducer(AppNavigator);

export default combineReducers({
  nav: navReducer,
  [authModule]: authReducer,
  [currenciesModule]: currenciesReducer,
  [currencyModule]: currencyReducer,
  [searchModule]: searchReducer,
});

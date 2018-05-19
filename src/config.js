// @flow

import {Navigation} from 'react-native-navigation';
import AuthScreen from 'screens/AuthScreen';
import CurrenciesScreen from 'screens/CurrenciesScreen';
import CurrencyScreen from 'screens/CurrencyScreen';
import PortfolioScreen from 'screens/PortfolioScreen';
import NewPortfolioCurrencyScreen from 'screens/NewPortfolioCurrencyScreen';
import SettingsScreen from 'screens/SettingsScreen';

export const appName: 'cryptofolio' = 'cryptofolio';

// API url
export const baseURL: string = 'https://cryptofolio-condor.herokuapp.com/api/';

export function registerScreens(store: any, Provider: any) {
  Navigation.registerComponent(`${appName}.Auth`, () => AuthScreen, store, Provider);
  Navigation.registerComponent(`${appName}.CurrenciesList`, () => CurrenciesScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Currency`, () => CurrencyScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Portfolio`, () => PortfolioScreen, store, Provider);
  Navigation.registerComponent(`${appName}.NewPortfolioCurrency`, () => NewPortfolioCurrencyScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Settings`, () => SettingsScreen, store, Provider);
}
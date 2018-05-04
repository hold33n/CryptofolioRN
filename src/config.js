import { Navigation } from 'react-native-navigation'
import AuthScreen from 'screens/AuthScreen'
import CurrenciesScreen from 'screens/CurrenciesScreen'
import CurrencyScreen from 'screens/CurrencyScreen'
import PortfolioScreen from 'screens/PortfolioScreen'
import NewPortfolioCurrencyScreen from 'screens/NewPortfolioCurrencyScreen'
import SettingsScreen from 'screens/SettingsScreen'

export const appName = 'cryptofolio'

export function registerScreens(store, Provider) {
  Navigation.registerComponent(`${appName}.Auth`, () => AuthScreen, store, Provider);
  Navigation.registerComponent(`${appName}.CurrenciesList`, () => CurrenciesScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Currency`, () => CurrencyScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Portfolio`, () => PortfolioScreen, store, Provider);
  Navigation.registerComponent(`${appName}.NewPortfolioCurrency`, () => NewPortfolioCurrencyScreen, store, Provider);
  Navigation.registerComponent(`${appName}.Settings`, () => SettingsScreen, store, Provider);
}
import React from 'react';
import { GREY_5, GREY_80, GREY_100 } from 'colors';
import { Image, Text, AsyncStorage } from 'react-native';
import AuthScreen from 'screens/AuthScreen';
import CurrenciesScreen from 'screens/CurrenciesScreen';
import CurrencyScreen from 'screens/CurrencyScreen';
import PortfolioScreen from 'screens/PortfolioScreen';
import SettingsScreen from 'screens/SettingsScreen';
import HeaderBackButton from 'components/HeaderBackButton';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

const BottomTabsConfig = {
  initialRouteName: 'Currencies',
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#2BBDF5',
    style: {
      backgroundColor: GREY_80,
    },
  },
};

const BottomTabsIconStyle = {
  width: 20,
  height: 20,
};

const TopStackConfig = {
  backgroundColor: GREY_80,
  borderBottomWidth: 0,
};

const TopStackTitleConfig = {
  color: '#fff',
};

const DashboardRouteConfigs = {
  Currencies: {
    screen: createStackNavigator(
      {
        CurrenciesListScreen: {
          screen: CurrenciesScreen,
          navigationOptions: () => ({
            headerTitle: 'CURRENCIES',
            headerStyle: TopStackConfig,
            headerTitleStyle: TopStackTitleConfig,
          }),
        },
        CurrencyInfoScreen: {
          screen: CurrencyScreen,
          navigationOptions: ({ navigation }) => ({
            headerStyle: TopStackConfig,
            headerTitleStyle: TopStackTitleConfig,
            title: navigation.state.params.activeCurrencyName.toUpperCase(),
            headerLeft: <HeaderBackButton navigation={navigation} />,
          }),
        },
      },
      {
        initialRouteName: 'CurrenciesListScreen',
      },
    ),
    navigationOptions: () => ({
      tabBarIcon: ({ focused, tintColor }) =>
        focused ? (
          <Image style={BottomTabsIconStyle} source={require('assets/img/stats_active.png')} />
        ) : (
          <Image style={BottomTabsIconStyle} source={require('assets/img/stats.png')} />
        ),
    }),
  },

  Portfolio: {
    screen: createStackNavigator(
      {
        PortfolioAnalyticsScreen: {
          screen: PortfolioScreen,
          navigationOptions: () => ({
            headerTitle: 'PORTFOLIO',
            headerStyle: TopStackConfig,
            headerTitleStyle: TopStackTitleConfig,
          }),
        },
      },
      {
        initialRouteName: 'PortfolioAnalyticsScreen',
      },
    ),
    navigationOptions: () => ({
      tabBarIcon: ({ focused, tintColor }) =>
        focused ? (
          <Image style={BottomTabsIconStyle} source={require('assets/img/analytics_active.png')} />
        ) : (
          <Image style={BottomTabsIconStyle} source={require('assets/img/analytics.png')} />
        ),
    }),
  },
  Settings: {
    screen: createStackNavigator(
      {
        SettingsScreen: {
          screen: SettingsScreen,
          navigationOptions: () => ({
            headerTitle: 'SETTINGS',
            headerStyle: TopStackConfig,
            headerTitleStyle: TopStackTitleConfig,
          }),
        },
      },
      {
        initialRouteName: 'SettingsScreen',
      },
    ),
    navigationOptions: () => ({
      tabBarIcon: ({ focused, tintColor }) =>
        focused ? (
          <Image style={BottomTabsIconStyle} source={require('assets/img/settings_active.png')} />
        ) : (
          <Image style={BottomTabsIconStyle} source={require('assets/img/settings.png')} />
        ),
    }),
  },
};

const DashboardNavigator = createBottomTabNavigator(DashboardRouteConfigs, BottomTabsConfig);

const fetchUserId = async () => {
  const userId = await AsyncStorage.getItem('userId');

  return userId;
};

const userId = fetchUserId();

export const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Dashboard: DashboardNavigator,
});

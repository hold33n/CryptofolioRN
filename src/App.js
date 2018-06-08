// @flow

import React, { Component } from 'react';
// import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
// import { NAVIGATE, moduleName as navigatorModule } from 'ducks/navigator';
// import { iconsMap, iconsLoaded } from 'assets/AppIcons';
import { registerScreens } from 'config';
import { GREY_5, GREY_80, GREY_100 } from 'colors';
// import { AsyncStorage } from 'react-native';
// import type { Path } from 'ducks/navigator/types';
import CurrenciesScreen from 'screens/CurrenciesScreen';
import CurrencyScreen from 'screens/CurrencyScreen';
import PortfolioScreen from 'screens/PortfolioScreen';
import SettingsScreen from 'screens/SettingsScreen';
import AuthScreen from 'screens/AuthScreen';
import HeaderBackButton from 'components/HeaderBackButton';
import store from './redux/store';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { YellowBox, Image } from 'react-native';
// import type { NavigatorIconProps } from 'components/TabBarIcon/types';

// Temporary fix for yellow box issue with react-native: https://github.com/facebook/react-native/issues/18868
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  "Module RCTImageLoader requires main queue setup since it overrides `init` but doesn't implement `requiresMainQueueSetup`.",
]);

registerScreens(store, Provider);

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

const RouteConfigs = {
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

const AppRoot = createBottomTabNavigator(RouteConfigs, BottomTabsConfig);

export default class App extends Component<{}, {}> {
  render() {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');

      return userId;
    };

    const userId = fetchUserId();

    return <Provider store={store}>{userId ? <AppRoot /> : <AuthScreen />}</Provider>;
  }
}

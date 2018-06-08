// @flow

import React, { Component } from 'react';
// import { Navigation } from 'react-native-navigation';
// import { NAVIGATE, moduleName as navigatorModule } from 'ducks/navigator';
// import { iconsMap, iconsLoaded } from 'assets/AppIcons';
// import { registerScreens } from 'config';
import { GREY_5, GREY_80, GREY_100 } from 'colors';
// import { AsyncStorage } from 'react-native';
// import type { Path } from 'ducks/navigator/types';
import {
  createNavigationPropConstructor,
  initializeListeners,
} from 'react-navigation-redux-helpers';
import { navigationPropConstructor } from './redux/store';
import store from './redux/store';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { YellowBox, Image } from 'react-native';
import { RootNavigator } from 'navigators/RootNavigator';
import AuthScreen from 'screens/AuthScreen';
import { connect } from 'react-redux';
// import type { NavigatorIconProps } from 'components/TabBarIcon/types';

// Temporary fix for yellow box issue with react-native: https://github.com/facebook/react-native/issues/18868
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  "Module RCTImageLoader requires main queue setup since it overrides `init` but doesn't implement `requiresMainQueueSetup`.",
]);

type AppProps = {
  nav: Object,
  dispatch: mixed,
};

class App extends Component<AppProps, {}> {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }
  render() {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');

      return userId;
    };

    const userId = fetchUserId();

    const navigation = navigationPropConstructor(this.props.dispatch, this.props.nav);

    return userId ? <RootNavigator navigation={navigation} /> : <AuthScreen />;
  }
}

export default connect(({ navigator }) => ({
  nav: navigator,
}))(App);

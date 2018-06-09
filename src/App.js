// @flow

import React, { Component } from 'react';
import { GREY_5, GREY_80, GREY_100 } from 'colors';
import {
  createNavigationPropConstructor,
  initializeListeners,
} from 'react-navigation-redux-helpers';
import { navigationPropConstructor } from './redux/store';
import store from './redux/store';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { YellowBox, Image } from 'react-native';
import { AppNavigator } from 'navigators/RootNavigator';
import { connect } from 'react-redux';

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
    const navigation = navigationPropConstructor(this.props.dispatch, this.props.nav);

    return <AppNavigator navigation={navigation} />;
  }
}

export default connect(state => ({
  nav: state.nav,
}))(App);

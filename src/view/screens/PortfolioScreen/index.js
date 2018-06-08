// @flow

import React, { Component } from 'react';
import { appName } from 'config';
import { View, Text, StyleSheet } from 'react-native';
import { GREY_80 } from 'colors';
import { iconsMap } from 'assets/AppIcons';
import type { Props, NavigatorEvent } from './types';

class PortfolioScreen extends Component<Props, {}> {
  // constructor(props: Props) {
  //   super(props);

  //   this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  // }

  // onNavigatorEvent(event: NavigatorEvent) {
  //   // this is the onPress handler for the two buttons together
  //   if (event.type === 'NavBarButtonPress') {
  //     // this is the event type for button presses
  //     if (event.id === 'addItemToPortfolio') {
  //       // this is the same id field from the static navigatorButtons definition
  //       this.props.navigator.push({
  //         screen: `${appName}.NewPortfolioCurrency`,
  //         backButtonHidden: false,
  //         title: 'ADD CURRENCY',
  //         navigatorStyle: {
  //           navBarTranslucent: false,
  //           drawUnderNavBar: true,
  //           navBarTextColor: '#fff',
  //           navBarBackgroundColor: GREY_80,
  //           navBarButtonColor: 'white',
  //           navBarNoBorder: true,
  //           statusBarTextColorScheme: 'light',
  //           screenBackgroundColor: GREY_80,
  //         },
  //         navigatorButtons: {
  //           leftButtons: [
  //             {
  //               id: 'closeNewPortfolioCurrency',
  //               title: '',
  //               icon: iconsMap['ios-arrow-round-back'],
  //               buttonFontSize: 14,
  //             },
  //           ],
  //         },
  //       });
  //     }
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Here will be your portfolio!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    height: '100%',
  },
});

export default PortfolioScreen;

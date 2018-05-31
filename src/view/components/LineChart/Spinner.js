// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './';
import type { Animation } from './types';

export default class Spinner extends Component<{}, {}> {
  animation: Animation;

  componentDidMount() {
    if (this.animation) {
      this.animation.play();
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.containerLoader]}>
        <View style={styles.loader}>
          <LottieView
            source={require('../../../assets/loader.json')}
            style={styles.loader}
            ref={el => {
              this.animation = el;
            }}
          />
        </View>
      </View>
    );
  }
}

// @flow

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const HeaderBackButton = ({ navigation }: { navigation: Object }) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => {
      navigation.dispatch({ type: 'NAVIGATOR/NAVIGATE_BACK' });
    }}
  >
    <Image style={styles.backButtonIcon} source={require('assets/img/arrow-back.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 15,
  },
  backButtonIcon: {
    height: 15,
    width: 23,
  },
});

export default HeaderBackButton;

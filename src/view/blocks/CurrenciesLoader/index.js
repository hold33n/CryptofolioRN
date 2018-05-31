// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GREY_60 } from 'colors';

const CurrenciesLoader = () => (
  <View style={styles.currencyContainer}>
    <View style={styles.grid}>
      <View>
        <View style={styles.currencySymbol} />
      </View>
      <View style={styles.col_right}>
        <View style={styles.currencyPrice} />
        <View style={styles.currencyChange} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  currencyContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 36,
    opacity: 0.4,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col_right: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  currencySymbol: {
    backgroundColor: GREY_60,
    height: 25,
    borderRadius: 2,
    width: 45.5,
  },
  currencyPrice: {
    height: 18,
    width: 70,
    borderRadius: 2,
    backgroundColor: GREY_60,
  },
  currencyChange: {
    width: 25,
    height: 13,
    marginTop: 4,
    borderRadius: 2,
    backgroundColor: GREY_60,
  },
});

export default CurrenciesLoader;

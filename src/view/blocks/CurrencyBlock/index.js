// @flow

import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { formatPricePrecision } from 'utils/currency';
import { GREY_MARKER_BG, GREEN, RED } from 'colors';
import type { Props } from './types';

class CurrencyBlock extends React.PureComponent<Props, {}> {
  render() {
    const {
      item: { name, symbol, price_usd, percent_change_24h },
    } = this.props;

    let priceChange: boolean | React.Element<typeof Text> = false;

    if (price_usd) {
      if (percent_change_24h > 0) {
        priceChange = <Text style={styles.priceChangePlus}>+{percent_change_24h}%</Text>;
      } else {
        priceChange = <Text style={styles.priceChangeMinus}>{percent_change_24h}%</Text>;
      }
    }

    return (
      <View style={styles.currencyContainer}>
        <View style={styles.grid}>
          <View>
            <View style={styles.currencySymbol}>
              <Text style={styles.currencySymbolText}>{price_usd ? symbol : name}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.currencyPrice}>
              {price_usd ? formatPricePrecision(+price_usd) : false}
            </Text>
            <Text style={styles.currencyChange}>{priceChange}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currencyContainer: {
    marginBottom: 35,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencySymbol: {
    backgroundColor: GREY_MARKER_BG,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
  },
  currencySymbolText: {
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    fontSize: 15,
    lineHeight: 17,
    fontWeight: '600',
  },
  currencyPrice: {
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '600',
    textAlign: 'right',
  },
  currencyChange: {
    fontFamily: 'Rubik-Medium',
    color: '#8E97B6',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right',
  },
  priceChangePlus: {
    color: GREEN,
    fontWeight: '600',
  },
  priceChangeMinus: {
    color: RED,
    fontWeight: '600',
  },
});

export default CurrencyBlock;

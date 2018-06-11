// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, RefreshControl, ScrollView } from 'react-native';
import LineChart from 'components/LineChart';
import currencyFormatter from 'currency-formatter';
import { refreshCoinData } from 'ducks/currency';
import { connect } from 'react-redux';
// import { Icon } from 'react-native-elements';
import { GREEN, RED, GREY_80, GREY_10 } from 'colors';
import { formatPricePrecision } from 'utils/currency';
import store from '../../../redux/store';
import type { Props } from './types';

class CurrencyScreen extends Component<Props, {}> {
  render() {
    const {
      priceUsd,
      percentChange24h,
      marketCapUsd,
      availableSupply,
      dailyValue,
    } = this.props.coinData;

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={!this.props.progress && this.props.progressReload}
              onRefresh={() =>
                store.dispatch(refreshCoinData(this.props.coinData.id, this.props.activeFilter))
              }
            />
          }
        >
          <View>
            <View style={styles.currencyPrice}>
              <Text style={styles.currencyPriceSymbol}>$</Text>
              <Text style={styles.currencyPriceValue}>{formatPricePrecision(+priceUsd)}</Text>
            </View>
            <View style={styles.currencyChange}>
              {percentChange24h > 0 ? (
                <Image
                  style={{ width: 21, height: 12 }}
                  source={require('assets/img/trending-up.png')}
                />
              ) : (
                <Image
                  style={{ width: 21, height: 12 }}
                  source={require('assets/img/trending-down.png')}
                />
              )}
              <Text style={styles.currencyChangeText}>
                {percentChange24h > 0 ? (
                  <Text style={styles.priceChangePlus}>{percentChange24h}%</Text>
                ) : (
                  <Text style={styles.priceChangeMinus}>{-percentChange24h}%</Text>
                )}
              </Text>
            </View>
          </View>
          <LineChart coinId={this.props.coinData.id} progress={this.props.progress} />
          <View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>MARKET CAP</Text>
              <Text style={styles.currencyInfoValue}>
                {currencyFormatter.format(marketCapUsd, {
                  symbol: '$',
                  precision: 0,
                  format: '%s %v',
                  thousand: ' ',
                })}
              </Text>
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>VOLUME 24h</Text>
              <Text style={styles.currencyInfoValue}>
                {currencyFormatter.format(dailyValue, {
                  symbol: '$',
                  precision: 0,
                  format: '%s %v',
                  thousand: ' ',
                })}
              </Text>
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>CIRCULATING SUPPLY</Text>
              <Text style={styles.currencyInfoValue}>
                {currencyFormatter.format(availableSupply, {
                  precision: 0,
                  format: '%v', // %s is the symbol and %v is the value
                  thousand: ' ',
                })}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  currencyPrice: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  currencyPriceSymbol: {
    fontFamily: 'Rubik-Medium',
    color: GREY_10,
    fontSize: 16,
    marginRight: 10,
  },
  currencyPriceValue: {
    fontSize: 36,
    lineHeight: 36,
    fontFamily: 'Rubik-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  currencyChange: {
    display: 'flex',
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyChangeText: {
    fontFamily: 'Rubik-Medium',
    color: '#8E97B6',
    fontSize: 16,
    lineHeight: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  priceChangePlus: {
    color: GREEN,
    fontWeight: '600',
  },
  priceChangeMinus: {
    color: RED,
    fontWeight: '600',
  },
  currencyInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  currencyInfoName: {
    color: GREY_10,
    width: '50%',
    fontSize: 13,
    lineHeight: 14,
    fontFamily: 'Rubik-Medium',
  },
  currencyInfoValue: {
    color: '#fff',
    width: '50%',
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Rubik-Medium',
  },
});

export default connect(({ currency }) => ({
  coinData: currency.data,
  progress: currency.progressLoad,
  progressReload: currency.progressReload,
  activeFilter: currency.chartActiveFilter,
}))(CurrencyScreen);

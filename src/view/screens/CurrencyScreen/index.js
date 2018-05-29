// @flow

import React, {Component} from 'react';
import {StyleSheet, Text, View, RefreshControl, ScrollView} from 'react-native';
import LineChart from 'components/LineChart';
import {refreshCoinData} from 'ducks/currency/index';
import {connect} from 'react-redux';
import store from '../../../redux/store'
import {Icon} from 'react-native-elements';
import {GREEN, RED, GREY_80, GREY_10} from 'colors';
import currencyFormatter from 'currency-formatter';
import type {Props} from './types'


class CurrencyScreen extends Component<Props, {}> {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'closeCurrency') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop({
          animated: true, // does the pop have transition animation or does it happen immediately (optional)
        });
      }
    }
  }

  render() {

    const {
      percent_change_24h,
      market_cap_usd,
      available_supply,
      daily_value,
      price_usd,
    } = this.props.coinData;

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={!this.props.progress && this.props.progressReload}
              onRefresh={() => store.dispatch(refreshCoinData(this.props.coinData.id, this.props.activeFilter))}
            />
          }>
          <View>
            <View style={styles.currencyPrice}>
              <Text style={styles.currencyPriceSymbol}>$</Text>
              <Text style={styles.currencyPriceValue}>{(price_usd >= 1) ? (
                currencyFormatter.format(price_usd, {
                  symbol: '$',
                  precision: 2,
                  format: '%v', // %s is the symbol and %v is the value
                })) : (currencyFormatter.format(price_usd, {
                symbol: '$',
                precision: 6,
                format: '%v',
              }))
              }</Text>
            </View>
            <View style={styles.currencyChange}>
              {(percent_change_24h > 0) ? (
                <Icon
                  name='md-trending-up'
                  type='ionicon'
                  color={GREEN}
                  size={20}
                />) : (
                <Icon
                  name='md-trending-down'
                  type='ionicon'
                  color={RED}
                  size={20}
                />
              )}
              <Text style={styles.currencyChangeText}>{(percent_change_24h > 0) ? (
                <Text style={styles.priceChangePlus}>{percent_change_24h}%</Text>
              ) : (
                <Text style={styles.priceChangeMinus}>{-percent_change_24h}%</Text>
              )}</Text>
            </View>
          </View>
          <LineChart
            coinId={this.props.coinData.id}
            progress={this.props.progress}
          />
          <View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>MARKET CAP</Text>
              <Text style={styles.currencyInfoValue}>{currencyFormatter.format(market_cap_usd, {
                symbol: '$',
                precision: 0,
                format: '%s %v',
                thousand: ' ',
              })}</Text>
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>VOLUME 24h</Text>
              <Text style={styles.currencyInfoValue}>{currencyFormatter.format(daily_value, {
                symbol: '$',
                precision: 0,
                format: '%s %v',
                thousand: ' ',
              })}</Text>
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyInfoName}>CIRCULATING SUPPLY</Text>
              <Text style={styles.currencyInfoValue}>{currencyFormatter.format(available_supply, {
                precision: 0,
                format: '%v', // %s is the symbol and %v is the value
                thousand: ' ',
              })}</Text>
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


export default connect(({currency}) => ({
  coinData: currency.data,
  progress: currency.progressLoad,
  progressReload: currency.progressReload,
  activeFilter: currency.chartActiveFilter,
}))(CurrencyScreen);
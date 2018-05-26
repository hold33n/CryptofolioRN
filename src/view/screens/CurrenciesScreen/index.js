// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, RefreshControl, TouchableOpacity, View, Text, VirtualizedList} from 'react-native';
import CurrencyBlock from 'blocks/CurrencyBlock';
import CodePush from 'components/CodePush';
import CurrenciesLoader from 'blocks/CurrenciesLoader';
import {
  fetchCurrencies,
  refreshCurrencies,
} from 'ducks/currencies';
import {searchPhraseSelector, searchCurrenciesResultsSelector} from 'ducks/currenciesSearch/index';
import {selectCurrency} from 'ducks/currency';
import {store} from '../../../redux/store'
import Search from 'components/CurrenciesSearch';
import {connect} from 'react-redux';
import {appName} from 'config';
import {GREY_5, GREY_80} from 'colors';
import {iconsMap} from 'assets/AppIcons';
import type {CurrenciesScreenProps, CurrencyRowItemProps} from './types'


class CurrencyRowItem extends PureComponent<CurrencyRowItemProps, {}> {
  render() {

    const {item, selectCurrency, navigator} = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          selectCurrency(item);
          navigator.push({
            screen: `${appName}.Currency`,
            backButtonHidden: false,
            title: item.name.toUpperCase(),
            navigatorStyle: {
              navBarTranslucent: false,
              drawUnderNavBar: true,
              navBarTextColor: '#fff',
              navBarBackgroundColor: GREY_80,
              navBarButtonColor: 'white',
              navBarNoBorder: true,
              statusBarTextColorScheme: 'light',
              screenBackgroundColor: GREY_80,
            },
            navigatorButtons: {
              leftButtons: [
                {
                  id: 'closeCurrency',
                  title: '',
                  icon: iconsMap['ios-arrow-round-back'],
                  buttonFontSize: 14,
                },
              ],
            },
          });
        }}
        style={styles.item}
      >
        <CurrencyBlock
          item={item}
        />
      </TouchableOpacity>
    );
  }
}



class CurrenciesScreen extends PureComponent<CurrenciesScreenProps, {}> {
  componentDidMount() {
    store.dispatch(fetchCurrencies());
  }

  itemRenderer = ({item}) => <CurrencyRowItem
    item={item}
    navigator={this.props.navigator}
    selectCurrency={() => store.dispatch(selectCurrency())}
  />;

  getItem = (data, index) => data[index].obj;

  getItemCount = data => data.length;


  render() {

    const headerComponent = <Search/>;

    const { searchPhrase, searchCurrenciesResults, currenciesList } = this.props;

    const currenciesListData = currenciesList.map( el => ({obj: el}) ).slice(0, 50);

    const EmptyView = <Text style={styles.emptyText}>No items to display</Text>;

    return this.props.currenciesList.length > 0 ? (
      <View>
        <CodePush/>
        <VirtualizedList
          data={searchPhrase ? searchCurrenciesResults : currenciesListData}
          style={styles.container}
          renderItem={this.itemRenderer}
          getItem={this.getItem}
          getItemCount={this.getItemCount}
          ListHeaderComponent={headerComponent}
          getItemLayout={(data, index) => ({length: 73, offset: 73 * index, index})}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.props.progressReload}
              onRefresh={() => store.dispatch(refreshCurrencies())}
            />
          }
          windowSize={5}
          maxToRenderPerBatch={2}
        />
        {(searchPhrase && searchCurrenciesResults.length === 0) ? EmptyView : false}
      </View>
    ) : (
      <View>
        {headerComponent}
        <CurrenciesLoader/>
        <CurrenciesLoader/>
        <CurrenciesLoader/>
        <CurrenciesLoader/>
        <CurrenciesLoader/>
        <CurrenciesLoader/>
        <CurrenciesLoader/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
  },
  item: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  emptyText: {
    color: GREY_5,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: 10,
  },
});


export default connect(
  (state) => ({
    currenciesList: state.currencies.currenciesList,
    progressLoad: state.currencies.progressLoad,
    progressReload: state.currencies.progressReload,
    searchPhrase: searchPhraseSelector(state),
    searchCurrenciesResults: searchCurrenciesResultsSelector(state),
  })
)(CurrenciesScreen);
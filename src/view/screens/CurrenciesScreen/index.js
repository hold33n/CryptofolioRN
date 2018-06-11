// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar, RefreshControl, View, Text, VirtualizedList } from 'react-native';
import CodePush from 'components/CodePush';
import CurrenciesLoader from 'blocks/CurrenciesLoader';
import { fetchCurrencies, refreshCurrencies } from 'ducks/currencies';
import {
  searchPhraseSelector,
  searchCurrenciesResultsSelector,
} from 'ducks/currenciesSearch/index';
import { selectCurrency } from 'ducks/currency';
import Search from 'components/CurrenciesSearch';
import { connect } from 'react-redux';
import { GREY_5, GREY_80 } from 'colors';
import store from '../../../redux/store';
import CurrencyRowItem from './CurrencyRowItem';
import type { CurrenciesScreenProps } from './types';

class CurrenciesScreen extends PureComponent<CurrenciesScreenProps, {}> {
  componentDidMount() {
    store.dispatch(fetchCurrencies());
  }

  itemRenderer = ({ item }) => (
    <CurrencyRowItem
      item={item}
      navigation={this.props.navigation}
      selectCurrency={() => store.dispatch(selectCurrency(item))}
    />
  );

  getItem = (data, index) => data[index].obj;

  getItemCount = data => data.length;

  render() {
    const headerComponent = <Search />;

    const { searchPhrase, searchCurrenciesResults, currenciesList } = this.props;

    const currenciesListData = currenciesList.map(el => ({ obj: el })).slice(0, 50);

    const EmptyView = <Text style={styles.emptyText}>No items to display</Text>;

    return this.props.currenciesList.length > 0 ? (
      <View key="content">
        <StatusBar barStyle="light-content" />
        <CodePush />
        <VirtualizedList
          data={searchPhrase ? searchCurrenciesResults : currenciesListData}
          style={styles.container}
          renderItem={this.itemRenderer}
          getItem={this.getItem}
          getItemCount={this.getItemCount}
          ListHeaderComponent={headerComponent}
          getItemLayout={(data, index) => ({ length: 73, offset: 73 * index, index })}
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
        {searchPhrase && searchCurrenciesResults.length === 0 ? EmptyView : false}
      </View>
    ) : (
      <View key="content" style={styles.container}>
        {headerComponent}
        <CurrenciesLoader />
        <CurrenciesLoader />
        <CurrenciesLoader />
        <CurrenciesLoader />
        <CurrenciesLoader />
        <CurrenciesLoader />
        <CurrenciesLoader />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    height: '100%',
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

export default connect(state => ({
  currenciesList: state.currencies.currenciesList,
  progressLoad: state.currencies.progressLoad,
  progressReload: state.currencies.progressReload,
  searchPhrase: searchPhraseSelector(state),
  searchCurrenciesResults: searchCurrenciesResultsSelector(state),
}))(CurrenciesScreen);

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, RefreshControl, TouchableOpacity, View, Text, VirtualizedList } from 'react-native'
import CurrencyBlock from 'blocks/CurrencyBlock'
import CurrenciesLoader from 'blocks/CurrenciesLoader'
import { fetchCurrencies, refreshCurrencies, currenciesSelector, progressLoadSelector, progressReloadSelector } from 'ducks/currencies'
import { searchPhraseSelector, searchCurrenciesResultsSelector } from 'ducks/currenciesSearch'
import { selectCurrency } from 'ducks/currency'
import Search from 'components/CurrenciesSearch'
import { connect } from 'react-redux'
import { appName } from 'config'
import { GREY_5, GREY_80 } from 'colors'
import { iconsMap } from 'assets/AppIcons'


class CurrencyRowItem extends PureComponent {
  render() {

    const { item, selectCurrency, navigator } = this.props

    return (
      <TouchableOpacity
        onPress={() => {
          selectCurrency(item)
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
                }
              ]
            }
          })
        }}
        style={styles.item}
      >
        <CurrencyBlock
          item={item}
        />
      </TouchableOpacity>
    )
  }
}



@connect((state) => ({
  currenciesList: currenciesSelector(state),
  progressLoad: progressLoadSelector(state),
  progressReload: progressReloadSelector(state),
  searchPhrase: searchPhraseSelector(state),
  searchCurrenciesResults: searchCurrenciesResultsSelector(state),
}), { fetchCurrencies, refreshCurrencies, selectCurrency })
class CurrenciesScreen extends PureComponent {
  componentDidMount() {
    this.props.fetchCurrencies()
  }

  itemRenderer = ({ item }) => <CurrencyRowItem
    item={item}
    navigator={this.props.navigator}
    selectCurrency={this.props.selectCurrency}
  />

  getItem = (data, index) => data[index].obj

  getItemCount = data => data.length



  render() {

    const headerComponent = <Search />

    const { searchPhrase, searchCurrenciesResults, currenciesList } = this.props

    const currenciesListData = currenciesList.map(el => ({obj: el})).slice(0, 50)

    const EmptyView = <Text style={styles.emptyText}>No items to display</Text>

    return this.props.currenciesList.length > 0 ? (
      <View>
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
              onRefresh={this.props.refreshCurrencies}
            />
          }
          windowSize={5}
          maxToRenderPerBatch={2}
        />
        {(searchPhrase && searchCurrenciesResults.length === 0) ? EmptyView : false }
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
    )
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
  }
});

CurrenciesScreen.propTypes = {
  titleTextColor: PropTypes.string,
  changeTitleTextColor: PropTypes.func
}


export default CurrenciesScreen
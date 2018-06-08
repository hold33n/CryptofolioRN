// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  addSearchPhrase,
  clearSearchPhrase,
  searchPhraseSelector,
} from 'ducks/currenciesSearch/index';
import { GREY_60, GREY_80 } from 'colors';
import store from '../../../redux/store';
import type { Props } from './types';

class Search extends PureComponent<Props, {}> {
  componentWillUnmount() {
    store.dispatch(clearSearchPhrase());
  }

  handleTextChange = text =>
    text ? store.dispatch(addSearchPhrase(text)) : store.dispatch(clearSearchPhrase());

  render() {
    const { searchPhrase } = this.props;

    const clearIcon = searchPhrase ? { color: '#A0AAC9', name: 'close' } : false;

    return (
      // <SearchBar
      //   placeholder="Type Here..."
      //   platform="ios"
      //   cancelButtonTitle="Cancel"
      //   containerStyle={styles.searchBar}
      //   inputStyle={styles.searchInput}
      //   icon={{ type: 'material', color: '#A0AAC9', name: 'search' }}
      //   placeholderTextColor="#A0AAC9"
      //   onChangeText={this.handleTextChange}
      //   clearIcon={clearIcon}
      //   round
      // />
      <View>
        <Text>SearchBar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: GREY_80,
    paddingTop: -1,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 5,
    marginBottom: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: GREY_60,
    color: '#fff',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    paddingLeft: 28,
    borderRadius: 5,
  },
});

export default connect(state => ({
  searchPhrase: searchPhraseSelector(state),
}))(Search);

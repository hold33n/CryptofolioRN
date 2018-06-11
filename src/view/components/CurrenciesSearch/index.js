// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  addSearchPhrase,
  clearSearchPhrase,
  searchPhraseSelector,
} from 'ducks/currenciesSearch/index';
import { GREY_20, GREY_80, GREY_MARKER_BG } from 'colors';
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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type Here..."
          placeholderTextColor={GREY_20}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: GREY_80,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 25,
  },
  searchInput: {
    backgroundColor: GREY_MARKER_BG,
    color: '#fff',
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default connect(state => ({
  searchPhrase: searchPhraseSelector(state),
}))(Search);

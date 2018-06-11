// @flow

import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'ducks/auth/index';
import { List, ListItem } from 'native-base';
import { GREY_5, GREY_MARKER_BG, GREY_80, GREY_100 } from 'colors';
import store from '../../../redux/store';

class SettingsScreen extends Component<{}, {}> {
  render() {
    const list = [
      {
        title: 'Change passcode',
        onClickEvent: null,
      },
      {
        title: 'Change email',
        onClickEvent: null,
      },
      {
        title: 'Change password',
        onClickEvent: null,
      },
      {
        title: 'About',
        onClickEvent: null,
      },
      {
        title: 'Sign out',
        onClickEvent: () => store.dispatch(signOut()),
      },
    ];

    return (
      <View style={styles.container}>
        {list.map(({ title, onClickEvent }, index) => (
          <TouchableOpacity
            style={[styles.listItem, index % 2 === 0 ? styles.listItemAccent : null]}
            onPress={onClickEvent}
            key={title}
          >
            <Text style={styles.listItemTitle}>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    borderTopWidth: 0,
    height: '100%',
    paddingTop: 30,
  },
  email: {
    textAlign: 'center',
    color: GREY_5,
    fontSize: 16,
    fontWeight: '500',
  },
  listItem: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItemAccent: {
    backgroundColor: GREY_MARKER_BG,
  },
  listItemTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
  },
});

export default SettingsScreen;

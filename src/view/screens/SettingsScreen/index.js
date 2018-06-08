// @flow

import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'ducks/auth/index';
// import { List, ListItem } from 'react-native-elements';
import { GREY_5, GREY_80, GREY_100 } from 'colors';
import store from '../../../redux/store';

class SettingsScreen extends Component<{}, {}> {
  static get options(): Object {
    return {
      topBar: {
        title: 'Settings',
        translucent: false,
        transparent: false,
        drawUnder: true,
        textColor: '#fff',
        backgroundColor: GREY_80,
        buttonColor: 'white',
        noBorder: true,
        largeTitle: false,
      },
      bottomTabs: {
        translucent: false,
        drawUnder: true,
        textColor: '#fff',
        selectedTextColor: 'red',
        backgroundColor: GREY_100,
      },
      bottomTab: {
        title: 'Settings',
      },
    };
  }

  render() {
    const list = [
      {
        title: 'Reset password',
        onClickEvent: null,
      },
      {
        title: 'Sign out',
        onClickEvent: () => store.dispatch(signOut()),
      },
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.email}>Your email: asd</Text>
        <TouchableOpacity onPress={() => store.dispatch(signOut())}>
          <Text>Sign out</Text>
        </TouchableOpacity>
        {/* <List containerStyle={styles.container}> */}
        {/* {list.map(({ title, onClickEvent }, i) => (
            <TouchableOpacity key={i} onPress={onClickEvent}>
              <ListItem
                title={title}
                titleStyle={styles.listItemTitle}
                containerStyle={styles.listItem}
                hideChevron
              />
            </TouchableOpacity>
          ))} */}
        {/* </List> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    borderTopWidth: 0,
    height: '100%',
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
    paddingLeft: 10,
  },
  listItemTitle: {
    color: GREY_5,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
});

export default SettingsScreen;

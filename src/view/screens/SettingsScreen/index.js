import React, {Component} from 'react'
import { StatusBar, TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import { userSelector, signOut } from 'ducks/auth/index'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { GREY_5, GREY_80, GREY_100 } from 'colors'

class SettingsScreen extends Component {
  static get options() {
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
      }
    }
  }

  render() {

    const list = [
      {
        title: 'Reset password',
        icon: {
          name: 'ios-refresh-outline',
          type: 'ionicon',
          size: 28,
          style: {
            height: 28,
            width: 25,
            lineHeight: 28,
            marginRight: 4,
            color: GREY_5,
          }
        },
        onClickEvent: null
      },
      {
        title: 'Sign out',
        icon: {
          name: 'ios-log-out',
          type: 'ionicon',
          size: 24,
          style: {
            height: 24,
            width: 25,
            lineHeight: 24,
            marginRight: 4,
            color: GREY_5,
          }
        },
        onClickEvent: this.props.signOut
      },
    ]

    const { user } = this.props

    const email = user ? user.email : null

    return (
      <View>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.email}>Your email: {email}</Text>
        <List
          containerStyle={styles.container} >
          {
            list.map(({ title, icon, onClickEvent}, i) => (
              <TouchableOpacity
                key={i}
                onPress={onClickEvent}
              >
                <ListItem
                  title={title}
                  titleStyle={styles.listItemTitle}
                  containerStyle={styles.listItem}
                  leftIcon={icon}
                  hideChevron
                />
              </TouchableOpacity>
            ))
          }
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GREY_80,
    borderTopWidth: 0,
    height: '100%',
    marginTop: 20,
  },
  email: {
    textAlign: 'center',
    color: GREY_5,
    fontSize: 16,
    fontWeight: '500'
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


export default connect((state) => ({
  user: userSelector(state)
}), { signOut })(SettingsScreen)
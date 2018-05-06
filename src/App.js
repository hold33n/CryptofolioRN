import React, {Component} from 'react'
import { Navigation } from 'react-native-navigation'
import store from './redux/store'
import {Provider} from 'react-redux'
import { NAVIGATE, moduleName as navigatorModule } from 'ducks/navigator'
import { iconsMap, iconsLoaded } from 'assets/AppIcons'
import { appName, registerScreens } from 'config'
import { GREY_5, GREY_80, GREY_100 } from 'colors'

registerScreens(store, Provider)

class App extends Component {
  constructor(props) {
    super(props)

    store.subscribe(this.onStoreUpdate.bind(this));

    iconsLoaded.then(() => {
      store.dispatch({
        type: NAVIGATE,
        payload: {
          path: 'auth'
        }
      });
    });
  }

  // componentDidMount() {
  //   CodePush.sync({
  //     updateDialog: true,
  //     installMode: CodePush.InstallMode.IMMEDIATE
  //   });
  // }

  onStoreUpdate() {
    let path = store.getState()[navigatorModule].get('path')

    // handle a root change
    if (this.currentPath !== path) {
      this.currentPath = path;
      this.startApp(path);
    }
  }

  startApp(root) {

    const navigatorStyle = {
      navBarTranslucent: false,
      navBarTextFontFamily: 'Rubik-Medium',
      drawUnderNavBar: true,
      navBarTextColor: '#fff',
      navBarBackgroundColor: GREY_80,
      navBarButtonColor: 'white',
      navBarNoBorder: true,
      statusBarTextColorScheme: 'light',
      screenBackgroundColor: GREY_80,
      drawUnderTabBar: true,
    }

    const appNavigatorConfig = {
      tabs: [
        {
          screen: `${appName}.CurrenciesList`,
          icon: iconsMap['ios-stats'],
          selectedIcon: iconsMap['ios-stats'],
          title: 'CURRENCIES',
          iconInsets: { // add this to change icon position (optional, iOS only).
            top: 6, // optional, default is 0.
            left: 0, // optional, default is 0.
            bottom: -4, // optional, default is 0.
            right: 0 // optional, default is 0.
          },
          navigatorStyle
        },
        {
          screen: `${appName}.Portfolio`,
          icon: iconsMap['ios-analytics'],
          selectedIcon: iconsMap['ios-analytics'],
          title: 'PORTFOLIO',
          iconInsets: { // add this to change icon position (optional, iOS only).
          top: 6, // optional, default is 0.
            left: 0, // optional, default is 0.
            bottom: -4, // optional, default is 0.
            right: 0 // optional, default is 0.
          },
          navigatorStyle,
          navigatorButtons: {
            rightButtons: [
              {
                id: 'addItemToPortfolio',
                title: '',
                icon: iconsMap['ios-add'],
                buttonFontSize: 14,
              }
            ]
          }
        },
        {
          screen: `${appName}.Settings`,
          icon: iconsMap['ios-settings'],
          selectedIcon: iconsMap['ios-settings'],
          title: 'SETTINGS',
          navigatorStyle: {
            ...navigatorStyle,
            navBarTextColor: '#fff',
          },
          iconInsets: { // add this to change icon position (optional, iOS only).
            top: 6, // optional, default is 0.
            left: 0, // optional, default is 0.
            bottom: -4, // optional, default is 0.
            right: 0 // optional, default is 0.
          },
        }
      ],
      tabsStyle: {
        tabBarButtonColor: GREY_5,
        tabBarSelectedButtonColor: '#1394E9',
        tabBarBackgroundColor: GREY_100,
        tabBarTranslucent: false,
        tabBarLabelColor: '#A0AAC9',
        tabBarSelectedLabelColor: '#1394E9',
      },
      appStyle: {
        orientation: 'portrait',
      }
    }


    switch (root) {

      case 'auth':
        Navigation.startSingleScreenApp({
          screen: {
            screen: `${appName}.Auth`,
            navigatorStyle: {
              navBarHidden: true,
              screenBackgroundColor: '#364061',
            }
          },
        });
        return;

      case 'appRoot':
        Navigation.startTabBasedApp(appNavigatorConfig);
        return;

      default: //no root found
    }
  }
}

export default App

import React, { Component } from 'react';
import App from './src/App';
import store from './src/redux/store';
import { registerScreens } from './src/config';
import { Provider } from 'react-redux';

registerScreens(store, Provider);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

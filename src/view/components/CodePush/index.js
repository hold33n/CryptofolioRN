// @flow

import { Component } from 'react';
import codePush from 'react-native-code-push';

class CodePush extends Component<{}, {}> {
  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }

  render() {
    return false;
  }
}

export default codePush(CodePush);

import React, {Component} from 'react'
import codePush from 'react-native-code-push'

@codePush
class CodePush extends Component {
  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  render () { return false }
}

export default CodePush
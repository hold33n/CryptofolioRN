import React, {Component} from 'react'
import { StyleSheet, Text } from 'react-native'
import { navigateBack } from 'ducks/navigator'
import {connect} from 'react-redux'

class HeaderLeft extends Component {
  render() {
    return (
      <Text style={styles.headerLeft} onPress={this.props.navigateBack}>{this.props.title}</Text>
    )
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10
  }
})

export default connect(null, { navigateBack })(HeaderLeft)
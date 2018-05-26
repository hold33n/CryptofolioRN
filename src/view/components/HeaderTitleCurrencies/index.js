import React from 'react'
import {StyleSheet, Text} from 'react-native'
import { headerTitleVisibilitySelector } from 'ducks/currencies/index'
import {connect} from 'react-redux'

const HeaderTitleCurrencies = ({ children, headerTitleVisibility }) => <Text style={[styles.headerTitleCurrencies, headerTitleVisibility && styles.headerTitleCurrenciesVisible]}>{children}</Text>

const styles = StyleSheet.create({
  headerTitleCurrencies: {
    color: '#fff',
    fontSize: 16,
    opacity: 0
  },
  headerTitleCurrenciesVisible: {
    opacity: 1
  },
})

export default connect(state => ({ headerTitleVisibility: headerTitleVisibilitySelector(state) }))(HeaderTitleCurrencies)

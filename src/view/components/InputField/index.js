// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {GREY_5} from 'colors';
import type {Props} from './types'

const InputField = ({inputName, inputValue, handleChange, ...props}: Props) =>
  <View style={styles.inputField}>
    <Text style={styles.inputLabel}>{inputName}</Text>
    <TextInput
      style={styles.input}
      onChangeText={handleChange}
      value={inputValue}
      {...props}
    />
  </View>;

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 18,
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    textAlign: 'left',
    color: GREY_5,
    fontWeight: '600',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#242537',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    height: 46,
    color: '#fff',
    width: '100%',
  },
});

InputField.propTypes = {
  inputName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputField;
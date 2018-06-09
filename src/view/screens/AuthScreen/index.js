// @flow

import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import InputField from 'components/InputField';
import CodePush from 'components/CodePush';
import { connect } from 'react-redux';
import { signIn, signUp, toggleFormState } from 'ducks/auth';
import { GREY_5, GREY_80, RED } from 'colors';
import store from '../../../redux/store';
import type { Props, State } from './types';

class AuthScreen extends Component<Props, State> {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange = value => this.setState({ email: value });

  handlePasswordChange = value => this.setState({ password: value });

  handleSubmit = () =>
    this.props.formState === 'SignUp'
      ? store.dispatch(signUp({ email: this.state.email, password: this.state.password }))
      : store.dispatch(signIn({ email: this.state.email, password: this.state.password }));

  render() {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        this.props.navigation.navigate('CurrenciesListScreen');
      }
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <CodePush />

        <Text style={styles.title}>
          {this.props.formState === 'SignUp' ? 'Create Account' : 'Log in'}
        </Text>

        <Text style={styles.error}>{this.props.error}</Text>

        <InputField
          inputName="EMAIL"
          inputValue={this.state.email}
          handleChange={this.handleEmailChange}
          autoCapitalize="none"
        />

        <InputField
          inputName="PASSWORD"
          inputValue={this.state.password}
          handleChange={this.handlePasswordChange}
          autoCapitalize="none"
          clearTextOnFocus
          secureTextEntry
        />

        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>
              {this.props.formState === 'SignUp' ? 'SIGN UP' : 'SIGN IN'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.toggleFormControls}>
          <Text style={styles.paragraph}>
            {this.props.formState === 'SignUp'
              ? 'Already have an account?'
              : "Haven't got an account?"}
          </Text>
          <TouchableOpacity style={styles.link} onPress={() => store.dispatch(toggleFormState())}>
            <Text style={styles.linkText}>
              {this.props.formState === 'SignUp' ? 'Sign in' : 'Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY_80,
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '600',
  },
  error: {
    color: RED,
    fontWeight: '600',
    fontSize: 14,
    height: 14,
    marginBottom: 20,
  },
  toggleFormControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  paragraph: {
    color: GREY_5,
    fontWeight: '500',
    fontSize: 15,
  },
  link: {
    marginLeft: 5,
  },
  linkText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#fff',
    shadowColor: '#3023AE',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 38,
    paddingRight: 38,
    borderRadius: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#1588e9',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '700',
  },
});

export default connect(({ auth: { progress, error, formState } }) => ({
  progress,
  error,
  formState,
}))(AuthScreen);

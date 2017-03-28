import React, { Component } from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {

  state = {
    emailValue: '',
    passwordValue: '',
    error: '',
    loading: false
  };

  handleLoginClick() {
    const {emailValue, passwordValue} = this.state

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      });
  }

  onLoginSuccess() {
    this.setState({
      emailValue: '',
      passwordValue: '',
      loading: false,
      error: ''
    })
  }

  onLoginFail() {
    this.setState({
      error: "Authentication failed",
      loading: false
    })

  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size={'small'}/>;
    }

    return <Button onPress={this.handleLoginClick.bind(this)}> Log In </Button>

  }

  render(){

    return (
      <Card>
        <CardSection>
          <Input
          placeholder="user@gmail.com"
          label="Email"
          value={this.state.emailValue}
          onChangeText={emailValue => this.setState({ emailValue })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="password"
            value={this.state.passwordValue}
            onChangeText={passwordValue => this.setState({ passwordValue })}
            label="Password"
            passwordInput
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  }
}

export default LoginForm;

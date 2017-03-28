import React, { Component } from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Card, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

  state = {loggedIn: null,};

  componentWillMount() {
    firebase.initializeApp ({
      apiKey: "AIzaSyA_wQlYCZz4zXh4jbepTA-WOXvxcWXk4CA",
      authDomain: "auth-c75a6.firebaseapp.com",
      databaseURL: "https://auth-c75a6.firebaseio.com",
      storageBucket: "auth-c75a6.appspot.com",
      messagingSenderId: "256633496611"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }
      else {
        this.setState({ loggedIn: false });
      }
    })
  }

  renderContent() {

    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication!" />
        {this.renderContent()}
      </View>)
  }
}

export default App;

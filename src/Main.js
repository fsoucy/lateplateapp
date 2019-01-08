import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './Home.js';
import LogIn from './LogIn.js'

class Main extends Component {
  constructor(props) {
    super(props);
    this.userLogIn = this.userLogIn.bind(this);
    this.userLogOut = this.userLogOut.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.state = {isLoggedIn: false, username: "Random username"}
  }

  checkLoggedIn() {
    console.log("Check logged in");
    fetch('http://0.0.0.0:8080/isLoggedIn', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data =>
        this.setState({username: data.username, isLoggedIn: data.isLoggedIn })
      )
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  userLogIn(username, password) {
    fetch('http://0.0.0.0:8080/logIn', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ isLoggedIn: data.logInAttempt, username: data.username }),
      );
  }

  userLogOut() {
    fetch('http://0.0.0.0:8080/logOut', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ isLoggedIn: false }),
      );
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Home username={this.state.username} logOutAction={this.userLogOut} />;
    } else {
      return <LogIn logInAction={this.userLogIn} />
    }
  }
}

export default Main;

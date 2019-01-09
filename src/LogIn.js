import React, { Component } from 'react';
import './LogIn.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      lengthWarning: false
    }
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onNewUsernameChange = this.onNewUsernameChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.lengthWarning = this.lengthWarning.bind(this);
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  onNewUsernameChange(e) {
    this.setState({newUsername: e.target.value});
  }

  onNewPasswordChange(e) {
    this.setState({newPassword: e.target.value});
  }

  handleClick() {
    this.props.logInAction(this.state.username, this.state.password);
  }

  handleCreateAccountClick() {
    if (this.state.newUsername.length == 0 || this.state.newPassword.length == 0) {
      this.setState({lengthWarning: true});
      return;
    }
    this.props.createAccountAction(this.state.newUsername, this.state.newPassword);
  }

  logInWarning() {
    if (this.props.failedLogIn) {
      return "warning";
    }
    return "warning hidden";
  }

  nameAlreadyExistsWarning() {
    if (this.props.nameAlreadyExistsWarning) {
      return "warning";
    }
    return "warning hidden";
  }

  lengthWarning() {
    if (this.state.lengthWarning) {
      return "warning";
    }
    return "warning hidden";
  }

  render() {
    return (
      <div className="logInContainer">
      <div className="logInBox">
      <h1>Log In</h1>
      <p className={this.logInWarning()}>Log in unsuccessful!</p>
      <input type="text" placeholder="Name" value={this.state.username}
                                            onChange={this.onUsernameChange} />
      <input type="password" placeholder="Password" value={this.state.password}
                                                onChange={this.onPasswordChange} />
      <button onClick={this.handleClick}>Log In</button>
      </div>
      <div className="createAccountBox">
      <h1>Create Account</h1>
      <p className={this.nameAlreadyExistsWarning()}>A user already exists with that name.</p>
      <p className={this.lengthWarning()}>Username and password must not be blank.</p>
      <input type="text" placeholder="Name" value={this.state.newUsername}
                                            onChange={this.onNewUsernameChange} />
      <input type="password" placeholder="Password" value={this.state.newPassword}
                                                onChange={this.onNewPasswordChange} />
      <button onClick={this.handleCreateAccountClick}>Create Account</button>
      </div>
      </div>
    );
  }
}

export default LogIn;

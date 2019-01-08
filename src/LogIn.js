import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleClick() {
    this.props.logInAction(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
      <h1>Log In</h1>
      <input type="text" placeholder="Name" value={this.state.username}
                                            onChange={this.onUsernameChange} />
      <br />
      <input type="text" placeholder="Password" value={this.state.password}
                                                onChange={this.onPasswordChange} />
      <br />
      <button onClick={this.handleClick}>Log In</button>
      </div>
    );
  }
}

export default LogIn;

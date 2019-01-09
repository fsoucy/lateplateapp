import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Home.css';

class NameInput extends Component {
  render() {
    return <input type="text" placeholder="Name" onKeyPress={this.props.onKeyPress}
                  onChange={this.props.onChange} value={this.props.nameValue} />
  }
}

class Name extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClickClose(this.props.name);
  }

  render() {
    return (
      <div className="nameContainer">
        <span className="close" onClick={this.handleClick} >x</span>
        <span className="name">{this.props.name}</span>
      </div>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ["Casey Bussone", "Frank Soucy", "Jonas Kantola", "Isaac Perper"],
      nameValue: "",
      hidden: true,
      illegalDelete: false
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.addName = this.addName.bind(this);
    this.removeName = this.removeName.bind(this);
    this.initializeNames = this.initializeNames.bind(this);
  }

  componentDidMount() {
    this.initializeNames();
  }

  handleLogOut() {
    this.props.logOutAction();
  }

  checkDuplicateWarning() {
    if (this.state.hidden) {
      return "duplicateWarning hidden";
    }
    return "duplicateWarning";
  }

  checkIllegalDeleteWarning() {
    if (!this.state.illegalDelete) {
      return "illegalDeleteWarning hidden";
    } else {
      return "illegalDeleteWarning";
    }
  }

  onChange(e) {
    this.setState({illegalDelete: false})
    this.setState({nameValue: e.target.value});
    this.setState({hidden:true});
  }

  initializeNames() {
    fetch('http://0.0.0.0:8080/getNames', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data =>
        this.setState({names: data.names}),
      )
  }

  addName(name) {
    if (!(name.length > 0)) {
      return;
    }
    fetch('http://0.0.0.0:8080/addName', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({names: data.names, illegalDelete: false}),
      )
  }

  removeName(name) {
    fetch('http://0.0.0.0:8080/removeName', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(response => response.json())
      .then(data =>
        this.setState({names: data.names, illegalDelete: data.illegalDelete}),
      )
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      var newNames = this.state.names;
      if (this.state.names.indexOf(this.state.nameValue) > -1) {
        console.log('Wrong! Duplicate!');
        this.setState({hidden: false});
        return;
      }
      this.addName(this.state.nameValue);
      this.setState({nameValue: ""});
    }
  }

  onClickClose(name) {
    this.removeName(name);
  }

  render() {
    return (
      <div>
      <div className="header">
      <div className="headerContainer">
        <h1 className="textHeader">Late Plate Form</h1>
        <h2 className="totalPlates">{this.state.names.length} Total Plates</h2>
        <p className={this.checkIllegalDeleteWarning()}>Cannot delete name you did not add!</p>
        <p className={this.checkDuplicateWarning()}>No duplicate names!</p>
      </div>
      <div className="logInInfo">
        <span>Hello, {this.props.username}</span>
        <button onClick={this.handleLogOut}>Log Out</button>
      </div>
      </div>
      <div className="container">
        <div className="item1">
          <NameInput nameValue={this.state.nameValue} onChange={this.onChange} onKeyPress={this.onKeyPress} />
        </div>
      </div>
      <div className="mainContainer">
        <div className="names">
          {this.state.names.map(name => <Name key={name} name={name} onClickClose={this.onClickClose} />)}
        </div>
      </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Nav, NavItem, Navbar, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';


class NavigationBar extends React.Component {
  // TODO: Implement conditional render that displays different NavBar for authenticated/unauthenticated users. 
  constructor(props) {
    super(props);
    this.state = {
      username: 'Username', 
      password: 'password'
    }; 
  }

  componentWillMount(){
    console.log('MOUNTING NAV BAR'); 
    console.log('NAVBAR STATE:', this.state); 
    console.log('RECEIVING PROPS: ', this.props); 
    this.setState({
      userID: this.props.userID,
      username: this.props.username
    });
  }

  handleSubmit (event) {
    event.preventDefault(); 
    console.log(this.state.username, this.state.password);
    var user = this.state; 
    this.props.handleLoginUser(user);
    this.setState({password: null});
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'username') {
      this.setState({username: event.target.value}); 
    } else if (inputType === 'password') {
      this.setState({password: event.target.value}); 
    }
  } 

  handleLogout(event){
    event.preventDefault();
    console.log('Attempting to logout!'); 
    //11:45
    var user = this.state;
    this.props.handleLogOutUser(user);
  }

  handleFocus(event){
    this.setState({username: ''});
  }

  _renderAuthentication() {
    if (this.props.userID === null) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup  style={{padding: 10}}>
            <FormControl type="text" id="username" onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} value={this.state.username} style={{margin: 5}}/>
            <FormControl type="password" id="password" onChange={this.handleChange.bind(this)} value={this.state.password} name="password" style={{margin: 5}}/>
            <Button type="submit" onSubmit={this.handleSubmit.bind(this)} onClick={this.handleSubmit.bind(this)} style={{margin: 5}}>Log In</Button>  
          </FormGroup>
        </form> 
      )
    } else {
      return (
        <Button type="submit" onSubmit={this.handleLogout.bind(this)} onClick={this.handleLogout.bind(this)} style={{margin: 5}}>Log Out</Button>  
      )
    }
  }

  render() {
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">SkilletHub</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onClick={this.props.handleNavigation.bind(this)}>
              <NavItem eventKey={1} title={`/User/${this.state.username}`}> Profile </NavItem>
              <NavItem eventKey={2} title={'/Recipe'}> Recipe </NavItem>
              <NavItem eventKey={3} title={'/Create'}> Create Recipe </NavItem>
              <NavItem eventKey={4} title={'/Edit'}> Edit Recipe </NavItem>
              <NavItem eventKey={5} style={{display: 'none'}}> username: {this.props.username} </NavItem>
              <NavItem eventKey={6} style={{display: 'none'}}> userID: {this.props.userID} </NavItem>
            </Nav>
            <Nav pullRight>
              <Navbar.Form >
                {this._renderAuthentication()}
              </Navbar.Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 

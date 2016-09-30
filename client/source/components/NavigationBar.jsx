import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Nav, NavItem, Navbar, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';


class NavigationBar extends React.Component {
  // TODO: Implement conditional render that displays different NavBar for authenticated/unauthenticated users. 
  constructor(props) {
    super(props);
    this.state = {
      username: 'Username', 
      password: 'Password'
    }; 
  }

  handleSubmit (event) {
    console.log(event); 
    console.log(this.state.username, this.state.password);
    this.props.handleSignUp(event);
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'username') {
      this.setState({username: event.target.value}); 
    } else if (inputType === 'password') {
      this.setState({password: event.target.value}); 
    }
  } 

  _renderAuthButton() {
    if (this.state.username === "Username") {

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
            <Nav>
              <NavItem eventKey={1} href="#"><Link to='/User'> Profile </Link></NavItem>
              <NavItem eventKey={2} href="/Recipe"><Link to='/Recipe'> Recipe </Link></NavItem>
              <NavItem eventKey={3} href="#"><Link to='/Create'> Create Recipe </Link></NavItem>
              <NavItem eventKey={4} href="#"><Link to='/Edit'> Edit Recipe </Link></NavItem>
            </Nav>
            <Nav pullRight>
              <Navbar.Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup style={{padding: 10}}>
                  <FormControl type="text" id="username" onChange={this.handleChange.bind(this)} value={this.state.username} style={{margin: 5}}/>
                  <FormControl type="password" id="password" onChange={this.handleChange.bind(this)} value={this.state.password} name="password" style={{margin: 5}}/>
                </FormGroup>
                {' '}
                <Button type="submit" onSubmit={this.handleSubmit.bind(this)} style={{margin: 5}}>Sign Up</Button>  
              </Navbar.Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 

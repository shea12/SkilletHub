import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Nav, NavItem, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';


class NavigationBar extends React.Component {
  // TODO: Implement conditional render that displays different NavBar for authenticated/unauthenticated users. 

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
              <NavItem eventKey={2} href="#"><Link to='/Recipe'> Recipe </Link></NavItem>
              <NavItem eventKey={3} href="#"><Link to='/Create'> Create Recipe </Link></NavItem>
            </Nav>
            <Nav pullRight>
              <Navbar.Form>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
                {' '}
                <Button type="submit">Sign In</Button>
              </Navbar.Form>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={4} href="#">Sign Up</NavItem>
              <NavItem eventKey={5} href="#">Sign In</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    ); 
  }
}

export default NavigationBar; 





  // <Navbar>
  //   <Navbar.Header>
  //     <Navbar.Brand>
  //       <a href="#">SkilletHub</a>
  //     </Navbar.Brand>
  //   </Navbar.Header>
  //   <Nav className='NavBar' bsStyle="tabs" bsClass="nav" activeKey={1}>
  //     <NavItem eventKey={1} href="/Profile"><Link to='/User'> Profile </Link></NavItem>
  //     <NavItem eventKey={1} href="/Recipe"><Link to='/Recipe'> Recipe </Link></NavItem>
  //     <NavItem eventKey={1} href="/Create"><Link to='/Create'> Create Recipe </Link></NavItem>
  //   </Nav>
  // </Navbar>
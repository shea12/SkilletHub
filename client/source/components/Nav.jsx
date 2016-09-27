import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Nav extends React.Component {

  // TODO: Implement conditional render that displays different NavBar for authenticated/unauthenticated users. 

  render() {
    return (
    	<div className='NavBar'>
    	  <Link to='/Home' className='NavBarElement'>Home</Link>
    	  <Link to='/SignUp' className='NavBarElement'> Sign Up  </Link>
        <Link to='/User' className='NavBarElement'> Profile </Link>
        <Link to='/Recipe' className='NavBarElement'> Recipe </Link>
        <Link to='/Create' className='NavBarElement'> Create Recipe </Link>
    	</div>
    ); 
  }
}

export default Nav; 

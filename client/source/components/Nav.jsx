import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Nav extends React.Component {

  // TODO: Implement conditional render that displays different NavBar for authenticated/unauthenticated users. 

  render() {
    return (
    	<div className='NavBar'>
    	  <Link to='/Home' className='NavBarElement'>Home</Link>
    	  <Link to='/Calculator' className='NavBarElement'>  iLifted Calculator  </Link>
    	  <Link to='/Create' className='NavBarElement'>  Create Template </Link>
    	  <Link to='/Track' className='NavBarElement'>  Create Template </Link>
    	  <Link to='/SignUp' className='NavBarElement'> Sign Up  </Link>
    	</div>
    ); 
  }
}

export default Nav; 

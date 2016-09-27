// React + React-Router Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// Importing the React components from components folder
import App from './components/App';
import LandingPage from './components/LandingPage';

render((
	<Router history={browserHistory}> 
	  <Route path="/" component={App} >
	  	<IndexRoute component={LandingPage} />
	  </Route>
	</Router>
), document.getElementById('app')); 
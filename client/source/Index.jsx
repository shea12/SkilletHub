// React + React-Router Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// Importing the React components from components folder
import App from './components/App';
import LandingPage from './components/LandingPage';
import User from './components/User/UserPage';
import AltUser from './components/User/AltUserPage';
import RecipeMain from './components/Recipe/RecipeMain'; 
import CreateRecipeMain from './components/CreateRecipe/CreateRecipeMain'; 
import EditRecipeMain from './components/EditRecipe/EditRecipeMain';
import CookMeMain from './components/CookRecipe/CookMeMain'; 

render((
	<Router history={browserHistory}> 
	  <Route path="/" component={App}>
	  	<IndexRoute component={LandingPage} />
	  	<Route path="/User" component={User} />
      <Route path="/User/:username" component={User} />
	  	<Route path="/Recipe" component={RecipeMain} />
	  	<Route path="/Recipe/:username/:recipe" component={RecipeMain} />
	  	<Route path="/Cookme/:username/:recipe" component={CookMeMain} />
	  	<Route path="/Create" component={CreateRecipeMain} />
	  	<Route path="/Edit" component={EditRecipeMain} />
	  	<Route path="/Edit/:username/:recipe" component={EditRecipeMain} />
	  </Route>
	</Router>
), document.getElementById('app'));
import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Nav from './NavigationBar'; 

class App extends React.Component {
  constructor(props) {
  	super(props); 
  	this.state = {
      siteName: 'SkilletHub',
      userID: null
  	}; 
  }

  // handleCreateTemplate(template) {
  // 	console.log(template); 
  //   this.setState({
  //     skil
  //   }); 
  // }

  render () {
	// const children = React.Children.map(this.props.children, function (child) {
	//   return React.cloneElement(child, {
	//     handleCreateTemplate: this.handleCreateTemplate.bind(this),
	//     workoutTemplate: this.state.workoutTemplate
	//   })
	// }.bind(this))
    return (
    	<div> 
    		<Nav />
    		{ this.props.children }
    	</div>
    ); 
  }
}; 

export default App; 
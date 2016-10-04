import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Nav from './NavigationBar'; 

// Axios 
var axios = require('axios'); 


/************************************************************
*****************    AWS COGNITO CONFIG    ******************
************************************************************/
var AWS = require('aws-sdk');
// var passport = require('passport');
// var session = require('express-session');
// var GoogleStrategy = require('passport-google-oauth2').Strategy;
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var USER_POOL_APP_CLIENT_ID = '3998t3ftof3q7k5f0cqn260smk';
var USER_POOL_ID = 'us-west-2_P8tGz1Tx6';
var COGNITO_IDENTITY_POOL_ID = 'us-west-2:ea2abcb1-10a0-4964-8c13-97067e5b50bb';

AWS.config.region = 'us-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: COGNITO_IDENTITY_POOL_ID
});

/************************************************************
*******************     APP COMPONENT    ********************
************************************************************/

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      siteName: 'SkilletHub',
      userID: null,
      username: 'Username', 
      password: 'Password',
      firstname: 'First Name',
      lastname: 'Last Name',
      email: 'email',
      currentProfile: null,
      otherUser: false 
  	}; 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'username') {
      this.setState({username: event.target.value}); 
    } else if (inputType === 'password') {
      this.setState({password: event.target.value}); 
    } else if (inputType === 'firstname') {
      this.setState({firstname: event.target.value}); 
    } else if (inputType === 'lastname') {
      this.setState({lastname: event.target.value}); 
    } else if (inputType === 'email') {
      this.setState({email: event.target.value}); 
    }
  }

  handleSignUp(user){
    console.log('Attempting sign up!'); 
    console.log('User info: ', user.username); 
    this.setState({
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname:user.lastname,
      email: user.email
    }); 
    this.signUpUser(user).bind(this); 
  }

  handleLoginUser(user){
    console.log('In App.jsx, attempting login!'); 
    console.log('User info: ', user.username); 
    this.loginUser(user); 
  }

  handleLogOutUser(user){
    console.log('In App.jsx, attempting logout!'); 
    console.log('User info: ', user.username); 
    this.logOutUser(user); 
  }
  
  handleUserClick(event) {
    event.preventDefault(); 
    console.log('Clicked on username!'); 
    console.log(event.target); 
    console.log('USERNAME STATE');
    console.log(this.state.username);
    var username = event.target.id;
    var otherUser = this.state.username !== username ? true : false; 
    this.setState({otherUser: otherUser}); 
    browserHistory.push(`/User/${username}`);
  }

  handleRecipeViewClick(event) {
    event.preventDefault(); 
    console.log('Clicked on username!'); 
    console.log(event.target); 
    console.log('USERNAME: ', event.target.dataset.username); 
    var recipe = event.target.id;
    var username = event.target.dataset.username; 
    browserHistory.push(`/Recipe/${username}/${recipe}`);
  }

  handleRecipeEditClick(event) {
    event.preventDefault(); 
    console.log('CLICKED EDIT IN APP!'); 
    console.log(event.target); 
    var recipe = event.target.dataset.recipe;
    var username = event.target.dataset.username; 
    browserHistory.push(`/Edit/${username}/${recipe}`);
  }

  handleRecipeForkClick(event) {
    event.preventDefault(); 
    console.log('CLICKED FORK IN APP!'); 
    console.log(event.target); 
    var recipe = event.target.dataset.recipe;
    var username = event.target.dataset.username; 
    browserHistory.push(`/Edit/${username}/${recipe}`);
  }

  handleNavigation(event) {
    event.preventDefault();
    var route = event.target.title; 
    console.log('NAVIGATING TO:', route); 
    if(route === `/User/${this.state.username}/`) {
      this.setState({otherUser: false}); 
    }
    browserHistory.push(`${route}`);
  }

  createUser(token, userAttributes) {
    console.log('sending create user request');

    var userObject = {};
    userObject.createdAt = userAttributes[2].Value;
    userObject.username = userAttributes[3].Value;
    userObject.firstname = userAttributes[4].Value;
    userObject.lastname = userAttributes[5].Value;
    userObject.email = userAttributes[6].Value;
    userObject.token = token;

    console.log('userObject: ', userObject);

    axios.post(`/user/signup`, { 
      userObject
    })
    .then(function(response) {
      console.log('RESPONSE CREATE USER: ', response); 
      // browserHistory.push(`/User/${requestUsername}`);
    })
    .catch(function(error) {
      console.log(error); 
    }); 
  }

  setUserToken(token, userAttributes) {
    console.log('sending request to set user token');

    var userTokenObject = {};
    userTokenObject.token = token;
    userTokenObject.username = userAttributes[3].Value;

    axios.post(`/user/login`, { 
      userTokenObject
    })
    .then(function(response) {
      console.log('RESPONSE LOG IN USER: ', response); 
      // browserHistory.push(`/User/${requestUsername}`);
    })
    .catch(function(error) {
      console.log(error); 
    }); 
  }


  /************************************************************
  *****************    SIGN UP A NEW USER    ******************
  ALSO: Need to add user to our db, 
  ************************************************************/
  signUpUser (user) {
    var poolConfig = { UserPoolId: USER_POOL_ID, ClientId: USER_POOL_APP_CLIENT_ID };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolConfig);
    var currentTime = Date.now().toString();

    var prefUsername = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'preferred_username', Value: user.username});
    var firstname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'given_name', Value: user.firstname});
    var lastname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'family_name', Value: user.lastname});
    var email = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'email', Value: user.email});
    var timeStamp = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({Name: 'updated_at', Value: currentTime});

    var attList = [];
    attList.push(prefUsername);
    attList.push(firstname);
    attList.push(lastname);
    attList.push(email);
    attList.push(timeStamp);

    var setUserState = function(token, userAttributes) {
      this.setState({ userID: userAttributes[0].Value, username: userAttributes[3].Value }); 
      this.setState({ token: token, password: undefined });
      browserHistory.push(`/User/${userAttributes[3].Value}`);
      this.createUser(token, userAttributes);
    }.bind(this); 

    userPool.signUp(user.username, user.password, attList, null, function(error, result) {
      if (error) { console.log('Error signing up user: ', error); }

      var cognitoUser = result.user;
      var authData = { Username: user.username, Password: user.password };

      var authDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
      
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (authResult) {
          var token = authResult.getAccessToken().getJwtToken();

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
            Logins: { 'token': token }
          });

          cognitoUser.getUserAttributes(function(error, userAttributes) {
            if (error) { console.log('error in getUserAttributes: ', error); } 
            setUserState(token, userAttributes);
          });

        },
        onFailure: function(error) {
          console.log('Error authenticating user: ' + error);
          alert(error);
        }
      });
    });
  }

  /************************************************************
  /**************    LOG IN EXISTING USER    ******************
  NOTE: After user has been authenticated, we need to remove 
        their password from the state! 
  ALSO: Need to add auth token to our user db on login
  ************************************************************/
  loginUser (user) {
    console.log('LOGGING USER IN FUNCTION: ');
    console.log(user); 
    var authData = { Username: user.username, Password: user.password };
    var authDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
    var poolConfig = { UserPoolId: USER_POOL_ID, ClientId: USER_POOL_APP_CLIENT_ID };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolConfig);
    var userData = { Username: user.username, Pool: userPool };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

    var setUserState = function(token, userAttributes) {
      console.log(userAttributes); 
      console.log('USERNAME: ', userAttributes[3].Value); 
      this.setState({ userID: userAttributes[0].Value, username: userAttributes[3].Value }); 
      this.setState({ token: token, password: undefined });
      browserHistory.push(`/User/${userAttributes[3].Value}`);
      this.setUserToken(token, userAttributes);
    }.bind(this); 
    
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (authResult) {
        var token = authResult.getAccessToken().getJwtToken();

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: COGNITO_IDENTITY_POOL_ID,
          Logins: {'token': token }
        });

        cognitoUser.getUserAttributes(function(error, userAttributes) {
          if (error) { console.log('error in getUserAttributes: ', error); } 
          setUserState(token, userAttributes);
        });
      },
      onFailure: function(error) {
        console.log('Error authenticating user: ', error);
        alert(error);
      }
    });
  };

  /************************************************************
  /******************    LOG OUT USER    **********************
  ************************************************************/
  logOutUser (user) {
    // console.log("before logout: ", window.AWS.config.credentials);
    var poolData = { UserPoolId: USER_POOL_ID, ClientId: USER_POOL_APP_CLIENT_ID };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = { Username: user.username, Pool: userPool };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.signOut();
    console.log('logged out user: ', cognitoUser);

    this.setState({username: null});
    this.setState({password: null});
    this.setState({userID: null});
    this.setState({token: null});

    window.AWS.config.credentials.params.IdentityPoolId = '';
    window.AWS.config.credentials.params.Logins.token = '';
    // console.log("after logout: ", window.AWS.config.credentials);

    var userObject = {username: user.username};

    axios.post(`/user/login`, { 
      userObject
    })
    .then(function(response) {
      console.log('RESPONSE LOG OUT USER: ', response); 
      // browserHistor  y.push(`/User/${requestUsername}`);
    })
    .catch(function(error) {
      console.log(error); 
    });


    //redirect to the landing page after logging out
    browserHistory.push('/');
  };

  /************************************************************
  /******************    GET ALL USERS    *********************
  ************************************************************/
  // getListOfAllUsers() {
  //   var poolData = { 
  //     UserPoolId: USER_POOL_ID,
  //     ClientId: USER_POOL_APP_CLIENT_ID
  //   };
  //   var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  //   var options = {
  //     "AttributesToGet": [ "username" ],
  //     "UserPoolId": USER_POOL_ID
  //   };
  //   userPool.listUsers(options, {
  //     onSuccess: function(result) {
  //       console.log('result in getListUsers: ', result);
  //     },
  //     onError: function(error) {
  //       console.log('error in getListUsers: ', error);
  //     }
  //   });
  // };

  /************************************************************
  /****************    RENDER COMPONENTS    *******************
  ************************************************************/
  render () {

	const children = React.Children.map(this.props.children, function (child) {
	  return React.cloneElement(child, {
	    handleSignUp: this.handleSignUp.bind(this),
      // userID: this.state.userID,
      username: this.state.username, 
      otherUser: this.state.otherUser, 
      handleUserClick: this.handleUserClick.bind(this),
      handleRecipeViewClick: this.handleRecipeViewClick.bind(this), 
      handleRecipeEditClick: this.handleRecipeEditClick.bind(this),
      handleRecipeForkClick: this.handleRecipeForkClick.bind(this)
	  })
	}.bind(this))
    return (
    	<div> 
    		<Nav 
          userID={this.state.userID} 
          username={this.state.username} 
          handleLogOutUser={this.handleLogOutUser.bind(this)} 
          handleLoginUser={this.handleLoginUser.bind(this)} 
          handleNavigation={this.handleNavigation.bind(this)} />
    		{ children }
    	</div>
    ); 
  }
}; 

export default App; 



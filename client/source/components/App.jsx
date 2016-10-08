import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Nav from './NavigationBar'; 

// Axios 
var axios = require('axios'); 

/************************************************************
*****************    AWS COGNITO CONFIG    ******************
************************************************************/
var AWS = require('aws-sdk');
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
      userID: null,
      username: 'Rachel_Ray', 
      password: 'Password',
      currentProfile: null,
      loggedInUserProfile: true 
  	}; 
  }

  handleSignUp(user){
    // console.log('Attempting sign up!'); 
    // console.log('User info: ', user.username); 
    this.signUpUser(user).bind(this); 
  }

  handleLoginUser(user){
    // console.log('In App.jsx, attempting login!'); 
    // console.log('User info: ', user.username); 
    this.loginUser(user); 
  }

  handleLogOutUser(user){
    // console.log('In App.jsx, attempting logout!'); 
    // console.log('User info: ', user.username); 
    this.logOutUser(user); 
  }
  
  handleUserClick(event) {
    event.preventDefault(); 
    // console.log('Clicked on username!'); 
    // console.log(event.target); 
    // console.log('USERNAME STATE');
    // console.log(this.state.username);
    var selectedUser = event.target.id;
    var loggedInUserProfile = this.state.username === selectedUser ? true : false; 
    this.setState({loggedInUserProfile: loggedInUserProfile}); 
    browserHistory.push(`/User/${selectedUser}`);
  }

  handleRecipeViewClick(event) {
    event.preventDefault(); 
    // console.log('Clicked on username!'); 
    // console.log(event.target); 
    // console.log('USERNAME: ', event.target.dataset.username); 
    var usernameParameter = event.target.dataset.username; 
    var recipeParameter = event.target.dataset.recipe; 
    browserHistory.push(`/Recipe/${usernameParameter}/${recipeParameter}`);
  }

  handleRecipeEditClick(event) {
    event.preventDefault(); 
    // console.log('CLICKED EDIT IN APP!'); 
    // console.log(event.target); 
    var usernameParameter = event.target.dataset.username; 
    var recipeParameter = event.target.dataset.recipe;
    browserHistory.push(`/Edit/${usernameParameter}/${recipeParameter}`);
  }

  // handler for editing a specific version of a recipe
  handleRecipeVersionEdit(recipeObject) {
    event.preventDefault(); 
    var usernameParameter = recipeObject.username; 
    var recipeParameter = recipeObject.recipe;
    var branchParameter = recipeObject.branch;
    var versionParameter = recipeObject.version; 
    browserHistory.push(`/Edit/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}`);
  }

  handleRecipeForkClick(event) {
    event.preventDefault(); 
    // console.log('CLICKED FORK IN APP!'); 
    // console.log(event.target.dataset); 
    var usernameParameter = event.target.dataset.username; 
    var recipeParameter = event.target.dataset.recipe;
    var branchParameter = event.target.dataset.branch;
    var versionParameter = event.target.dataset.version; 
    var loggedInUser = this.state.username; 
    // console.log('FORK USER: ', forkUser); 
    axios.post(`/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}/fork`, {
      username: loggedInUser
    })
    .then((result) => {
      // console.log('SUCCESSFUL FORK!');
      // console.log(result); 
      browserHistory.push(`/User/${loggedInUser}`);
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handleRecipeVersionFork(recipeObject) {
    var usernameParameter = recipeObject.username; 
    var recipeParameter = recipeObject.recipe;
    var branchParameter = recipeObject.branch;
    var versionParameter = recipeObject.version; 
    var loggedInUser = this.state.username; 

    axios.post(`/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}/fork`, {
      username: loggedInUser
    })
    .then((result) => {
      browserHistory.push(`/User/${loggedInUser}`);
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handleRecipeVersionPull(recipeObject) {
    var usernameParameter = recipeObject.username; 
    var recipeParameter = recipeObject.recipe;
    var branchParameter = recipeObject.branch;
    var versionParameter = recipeObject.version; 
    browserHistory.push(`/Pull/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}`);
  }

  handleCreatePullRequest(pullRequestObject) {
    var usernameParameter = this.state.username; 
    axios.post(`/${usernameParameter}/create-pull`, {
      targetUsername: pullRequestObject.targetUsername,
      sourceVersionId: pullRequestObject.sourceVersionId,
      targetVersionId: pullRequestObject.targetVersionId
    })
    .then((result) => {
      console.log('SUCCESSFUL PULL REQUEST'); 
      console.log(result); 
      browserHistory.push(`/User/${usernameParameter}`);
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handlePullRequestClick(event){
    event.preventDefault(); 
    console.log(event.target.dataset); 
    var usernameParameter = event.target.dataset.username; 
    var recipeParameter = event.target.dataset.recipe;
    var branchParameter = event.target.dataset.branch;
    var versionParameter = event.target.dataset.version; 
    var pullUserParameter = event.target.dataset.pulluser; 
    var pullRecipeParameter = event.target.dataset.pullrecipe; 

    browserHistory.push(`/Manage/${usernameParameter}/${recipeParameter}/${branchParameter}/${versionParameter}/${pullUserParameter}/${pullRecipeParameter}`);
  }

  handlePullRequestResponse(event) {
    event.preventDefault(); 
    var response = event.target.id; 
    if (response === 'approve') {
      var status = 'merged'; 
    } else if (response === 'deny') {
      var status = 'closed'; 
    }
    var usernameParameter = event.target.dataset.username; 
    var pullIdParameter = event.target.dataset.pullId; 
    axios.put(`/${usernameParameter}/${pullIdParameter}/update-pull`, {
      status: status
    })
    .then((result) => {
      console.log('SUCCESSFULLY RESOLVED PULL REQUEST'); 
      console.log(result); 
      browserHistory.push(`/User/${usernameParameter}`); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handlePullRequestEdit(event) {
    event.preventDefault(); 
    var usernameParameter = event.target.dataset.username;
    browserHistory.push(`/User/${usernameParameter}`); 
  }

  handlePullRequestEdit(event) {
    event.preventDefault(); 
  }


  handleNavigation(event) {
    event.preventDefault();
    var route = event.target.title; 
    // console.log('NAVIGATING TO:', route); 
    // if (route === `/User/${this.state.username}/`) {
    //   this.setState({loggedInUserProfile: true}); 
    // }
    if (route === '/User') {
      this.setState({loggedInUserProfile: true}); 
      route = `/User/${this.state.username}/`; 
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
    attList.push(prefUsername, firstname, lastname, email, timeStamp);

    var setUserState = function(token, userAttributes) {
      this.setState({ userID: userAttributes[0].Value, username: userAttributes[3].Value, token: token, password: undefined });
      this.createUser(token, userAttributes);
      browserHistory.push(`/User/${userAttributes[3].Value}`);
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
  ALSO: Need to set up error messages, input box highlighting
        on incorrect username/password or user non-existent
  ************************************************************/
  loginUser (user) {
    // console.log('LOGGING USER IN FUNCTION: ');
    // console.log(user); 
    var authData = { Username: user.username, Password: user.password };
    var authDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
    var poolConfig = { UserPoolId: USER_POOL_ID, ClientId: USER_POOL_APP_CLIENT_ID };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolConfig);
    var userData = { Username: user.username, Pool: userPool };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

    var setUserState = function(token, userAttributes) {
      // console.log(userAttributes); 
      // console.log('USERNAME: ', userAttributes[3].Value); 
      this.setState({ userID: userAttributes[0].Value, username: userAttributes[3].Value, token: token, password: undefined }); 
      this.setUserToken(token, userAttributes);
      browserHistory.push(`/User/${userAttributes[3].Value}`);
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

    var userObject = {username: user.username};
    // console.log('In log out, user.username: ', user.username);

    axios.post(`/user/logout`, { 
      userObject
    }).then(function(response) {
      // console.log('RESPONSE LOG OUT USER: ', response); 
      // browserHistor  y.push(`/User/${requestUsername}`);
    }).catch(function(error) {
      console.log(error); 
    });

    cognitoUser.signOut();
    console.log('logged out user: ', cognitoUser);

    this.setState({username: null, password: null, userID: null, token: null });

    window.AWS.config.credentials.params.IdentityPoolId = '';
    window.AWS.config.credentials.params.Logins.token = '';
    // console.log("after logout: ", window.AWS.config.credentials);

    //redirect to the landing page after logging out
    browserHistory.push('/');
  };

  /************************************************************
  /****************    RENDER COMPONENTS    *******************
  ************************************************************/
  render () {

	const children = React.Children.map(this.props.children, function (child) {
	  return React.cloneElement(child, {
      userID: this.state.userID,
      username: this.state.username, 
      loggedInUserProfile: this.state.loggedInUserProfile, 
      handleSignUp: this.handleSignUp.bind(this),
      handleUserClick: this.handleUserClick.bind(this),
      handleRecipeViewClick: this.handleRecipeViewClick.bind(this), 
      handleRecipeEditClick: this.handleRecipeEditClick.bind(this),
      handleRecipeForkClick: this.handleRecipeForkClick.bind(this),
      handleRecipeVersionFork: this.handleRecipeVersionFork.bind(this),
      handleRecipeVersionEdit: this.handleRecipeVersionEdit.bind(this),
      handleRecipeVersionPull: this.handleRecipeVersionPull.bind(this),
      handleCreatePullRequest: this.handleCreatePullRequest.bind(this),
      handlePullRequestClick: this.handlePullRequestClick.bind(this),
      handlePullRequestResponse: this.handlePullRequestResponse.bind(this), 
      handlePullRequestEdit: this.handlePullRequestResponse.bind(this)
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



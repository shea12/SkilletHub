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

  /************************************************************
  ***************    AUTHENTICATION HELPER    *****************
  ************************************************************/
  // authenticateUser (cognitoUser, authDeets, callback) {
    // cognitoUser.authenticateUser(authDeets, {
    //   onSuccess: function (result) {
    //     var token = result.getAccessToken().getJwtToken();
    //     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //       IdentityPoolId : COGNITO_IDENTITY_POOL_ID,
    //       Logins : { 'cognito-idp.us-west-2.amazonaws.com/us-west-2_P8tGz1Tx6': token }
    //     });
    //     callback(null, result);
    //   },
    //   onFailure: function(error) {
    //     console.log('Error in authenticateUser helper: ', error);
    //     callback(err);
    //   }
    // });
  // }

  /************************************************************
  *****************    SIGN UP A NEW USER    ******************
  ************************************************************/
  signUpUser (event) {
    event.preventDefault();
    debugger;
    console.log('signing up user');
    console.log('username: ', this.state.username);
    console.log('username: ', this.state.password);
    console.log('firstname: ', this.state.firstname);
    console.log('lastname: ', this.state.lastname);
    console.log('email: ', this.state.email);
    var poolConfig = {
      UserPoolId: USER_POOL_ID,
      ClientId: USER_POOL_APP_CLIENT_ID
    };

    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolConfig);
    var attList = [];
    var currentTime = Date.now().toString();

    var prefusername = {Name: 'preferred_username', Value: this.state.username};
    var firstname = {Name: 'given_name', Value: this.state.firstname};
    var lastname = {Name: 'family_name', Value: this.state.lastname};
    var email = {Name: 'email', Value: this.state.email};
    var timestamp = {Name: 'updated_at', Value: currentTime };

    var attPrefUsername = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(prefusername);
    var attFirstname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(firstname);
    var attLastname = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(lastname);
    var attEmail = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(email);
    var attTimeStamp = new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(timestamp);

    attList.push(attPrefUsername);
    attList.push(attFirstname);
    attList.push(attLastname);
    attList.push(attEmail);
    attList.push(attTimeStamp);

    var un = this.state.username;
    var pw = this.state.password;

    userPool.signUp(un, pw, attList, null, function(error, result) {
      if (error) {
        console.log('Error signing up user: ', error);
      }
      var cognitoUser = result.user;
      var authData = {
        Username: un,
        Password: pw
      };
      var authDeets = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
      cognitoUser.authenticateUser(authDeets, {
        onSuccess: function (result) {
          var token = result.getAccessToken().getJwtToken();
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId : COGNITO_IDENTITY_POOL_ID,
            Logins : { 'cognito-idp.us-west-2.amazonaws.com/us-west-2_P8tGz1Tx6': token }
          });
          console.log('auth success result: ', result);

          var user_id = ''
          var userDeets = cognitoUser.getUserAttributes(function(error, result) {
            if (error) { 
              console.log('error in deets: ', userDeets); 
            }
            else { 
              console.log('userDeets result: ', result); 
              user_id = result[0].Value;
              console.log('user_id: ', user_id);
            }
          });
        },
        onFailure: function(error) {
          console.log('Error authenticating user: ', error);
        }
      });
      console.log('sign up successful: ', cognitoUser);
    });
  }

  /************************************************************
  /**************    LOG IN EXISTING USER    ******************
  ************************************************************/
  loginUser (event) {
    var authData = {
      Username: this.state.username,
      Password: this.state.password
    }
    var authDeets = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
    var poolConfig = {
      UserPoolId: USER_POOL_ID,
      ClientId: USER_POOL_APP_CLIENT_ID
    }
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolConfig);
    var userData = {
        Username: this.state.username,
        Pool: userPool
    };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
    this.authenticateUser(cognitoUser, authDeets, function(err, result) {
      if (err) {
        console.log('error authenticating: ', cognitoUser);
      }
      console.log('auth successful for: ', cognitoUser);
      console.log('auth result: ', result);
    });
    // console.log('logged in user: ', cognitoUser);
  };

  /************************************************************
  /******************    LOG OUT USER    **********************
  ************************************************************/
  logout (event) {
    var poolData = { 
      UserPoolId: USER_POOL_ID,
      ClientId: USER_POOL_APP_CLIENT_ID
    };
    var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
      Username : this.state.username,
      Pool : userPool
    };
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.signOut();

    console.log('logged out user: ', cognitoUser);
  };

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
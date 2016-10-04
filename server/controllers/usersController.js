let Promise = require('bluebird');
let _ = require('underscore');
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let User = db.User;

module.exports = {
  signup: (req, res) => {
    //req.body should include:
    //  username, firstname, lastname, email, createdAt, and token
    console.log('in /user/signup controller, REQ.BODY: ', req.body);

    return new User({
      username: req.body.userObject.username,
      firstname: req.body.userObject.firstname,
      lastname: req.body.userObject.lastname,
      email: req.body.userObject.email,
      createdAt: req.body.userObject.createdAt,
      token: req.body.userObject.token
    }).save().then(function(result) {
      console.log('save in db result: ', result);
      res.status(200).send(result);
    });

  },

  login: (req, res) => {
    //req.body should include:
    //  username and token

    //find user entry in db by username,
    //set user's auth token 
    User.update({username: req.body.userTokenObject.username}, { 
      token: req.body.userTokenObject.token
    }, function(error, response) {
      if (error) {
        console.log('Error setting user token: ', error);
        res.status(400).send(error);
      } 
      console.log('Set user token. Response: ', response);
      res.status(200).send(response);
    });
  },

  logout: (req, res) => {
    //req.body should include:
    //  username

    //find user entry in db by username,
    //set user's auth token to empty string
    User.update({username: req.body.userObject.username}, { 
      token: ''
    }, function(error, response) {
      if (error) {
        console.log('Error removing user token: ', error);
        res.status(400).send(error);
      } 
      console.log('Remove user token. Response: ', response);
      res.status(200).send(response);
    });
  },

  //Gets all the recipes that belong to that user
  getProfile: (req, res) => {
    let userRecipeQuery = UserRecipe.findOne({
      username: req.params.username
    });
    let userQuery = User.findOne({
      username: req.params.username
    });

    return Promise.all([userRecipeQuery, userQuery])
    .spread((userRecipeResult, userResult) => {
      userRecipeResult = JSON.parse(JSON.stringify(userRecipeResult));
      userResult = JSON.parse(JSON.stringify(userResult));
      userResult = _.extend(userResult, userRecipeResult);
      res.status(200).send(userResult);
    }).catch(error => {
      res.status(404).send(error);
    });
  }
};
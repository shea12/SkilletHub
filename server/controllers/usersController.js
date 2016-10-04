let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;
let User = require(`${__dirname}/../schemas.js`).User;
let _ = require('underscore');


module.exports = {
  signup: (req, res) => {
    //req.body should include:
    //  username, firstname, lastname, email, createdAt, and token
    console.log('in /user/signup controller, REQ.BODY: ', req.body);

    let newUser = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      createdAt: req.body.createdAt,
      token: req.body.token
    };

    new User(newUser).save();

  },

  login: (req, res) => {
    //req.body should include:
    //  username and token

    //find user entry in db by username,
    //set user's auth token 
    User.update({username: req.body.username}, { 
      token: req.body.token
    }, function(error, response) {
      if (error) {
        console.log('Error setting user token: ', error);
      } 
      console.log('Set user token. Response: ', response);
    });
  },

  logout: (req, res) => {
    //req.body should include:
    //  username

    //find user entry in db by username,
    //set user's auth token to empty string
    User.update({username: req.body.username}, { 
      token: ''
    }, function(error, response) {
      if (error) {
        console.log('Error removing user token: ', error);
      } 
      console.log('Remove user token. Response: ', response);
    });
  },

  //Gets all the recipes that belong to that user
  getProfile: (req, res) => {
    UserRecipe.findOne({
      username: req.params.username
    }).then(result => {
      res.status(200).send(result);
    }).catch(error => {
      res.status(404).send(error);
    });
  }
};
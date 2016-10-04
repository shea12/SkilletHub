let Promise = require('bluebird');
let _ = require('underscore');
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let User = db.User;

module.exports = {
  signup: (req, res) => {

  },

  login: (req, res) => {

  },

  logout: (req, res) => {

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
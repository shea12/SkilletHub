let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let _ = require('underscore');
let Promise = require('bluebird')

// app.get('/:username/get-notifications', follows.getNotifications);
// app.post('/:username/follow/:user', follows.followUser);  
// app.post('/:username/follow/:user/:recipe', follows.followRecipe);  
// app.delete('/:username/unfollow/:user', follows.unfollowUser);
// app.delete('/:username/unfollow/:user/:recipe', follows.unfollowRecipe);

module.exports = {
  // description: Returns a list of all notifications for a user
  // params: {
  //   username: username of owner of the notifications,
  // }
  getNotifications: (req, res) => {

  },

  // description: Follows a user
  // params: {
  //   username: username of person following another
  //   user: username of the person being followed
  // }
  followUser: (req, res) => {

  },

  // description: Follows a recipe
  // params: {
  //   username: username of the person following a recipe
  //   user: username of the person the recipe belongs to
  //   recipe: root recipe id of the recipe being followed
  // }
  followRecipe: (req, res) => {

  },

  // description: Unfollows a user
  // params: {
  //   username: username of person following another
  //   user: username of the person being followed
  // }
  unfollowUser: (req, res) => {

  },

  // description: Unfollows a Recipe
  // params: {
  //   username: username of the person following a recipe
  //   user: username of the person the recipe belongs to
  //   recipe: root recipe id of the recipe being followed
  // }
  unfollowRecipe: (req, res) => {

  }
};
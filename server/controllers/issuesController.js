let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let Issue = db.Issue;
let Comment = db.Comment;
let _ = require('underscore');
let Promise = require('bluebird')

module.exports = {
  // description: Creates an issue
  // body: {
  //   username: person who created the issue
  //   type: ingredient / step ,
  //   position: position of ingredient or step
  // }
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  createIssue: (req, res) => {

  },

  // description: Updates the status of an issue
  // body: {
  //   status: "closed" or "resolved"
  // }
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  updateStatus: (req, res) => {

  },

  // description: Gets all issues for a recipe
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  getIssues: (req, res) => {

  },

  // description: Adds a comment to an issue
  // body: {
  //   data: comment text
  // }
  // params: {
  //   username: username of person who made comment,
  //   issue: id of the issue the comment belongs to
  // }
  createComment: (req, res) => {

  }
};
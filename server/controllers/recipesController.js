let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let _ = require('underscore');

module.exports = {
  // description: Makes a new recipe
  // body: { recipe changes }
  createRecipe: (req, res) => {
    helpers.makeVersion('new', req.body.recipeObject, req.params.username)
    .then(result => {
      return helpers.addUserRecipesCollection(req.params.username, result);
    }).then(result => {
      res.status(201).send();
    }).catch(error => {
      res.status(500).send(error)
    });
  },

  // description: Gets latest version in master
  getRecipe: (req, res) => {
    let branch = 'master';
    UserRecipe.findOne({
      username: req.params.username
    }).then(userRecipesCollection => {
      let recipe = _.find(userRecipesCollection.recipes, recipe => {
        return recipe.rootRecipeId.equals(req.params.recipe);
      });
      let version = _.find(recipe.branches, currentBranch => {
        return currentBranch.name === branch;
      });
      return Recipe.findOne({
        _id: version.mostRecentVersionId
      });
      
    }).then(version => {
      return helpers.retrieveVersion(version);
    }).then(result => {
      res.status(200).send(result);
    }).catch(error => {
      res.status(404).send(error);
    })
  },
  
  // description: Removes versions with no downstream, makes others unavailable
  deleteRecipe: (req, res) => {

  }
};
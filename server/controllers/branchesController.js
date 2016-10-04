let helpers = require(`${__dirname}/../helpers.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;
let _ = require('underscore');

module.exports = {
  // description: creates a new version an existing version with a new branch name
  // body: {
  //   version: { version object branched from }
  // }
  createBranch: (req, res) => {
    let versionId, rootId;
    let branch = {
      branch: req.params.branch
    };
    helpers.makeVersion(req.body.version, branch, req.params.username)
    .then(version => {
      versionId = version._id;
      rootId = version.rootVersion;
      return UserRecipe.findOne({
        username: req.params.username
      });

    }).then((userRecipeCollection) => {
      let recipe = _.find(userRecipeCollection.recipes, recipe => {
        return recipe.rootRecipeId.equals(rootId);
      });
      recipe.branches.push({
        name: req.params.branch,
        mostRecentVersionId: versionId
      });
      return UserRecipe.update({
        username: req.params.username
      }, userRecipeCollection);

    }).then((updateResults) => {
      res.status(201).send(updateResults);
    }).catch(error => {
      res.status(500).send(error);
    });
  },

  // description: gets the latest version in a branch
  getBranch: (req, res) => {
    UserRecipe.findOne({
      username: req.params.username
    }).then(userRecipesCollection => {
      let recipe = _.find(userRecipesCollection.recipes, recipe => {
        return recipe.rootRecipeId.equals(req.params.recipe);
      });
      let version = _.find(recipe.branches, currentBranch => {
        return currentBranch.name === req.params.branch;
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

  //removes versions with no downstream, makes rest unavailable
  deleteBranch: (req, res) => {

  }
};
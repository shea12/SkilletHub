let helpers = require(`${__dirname}/../helpers.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;
let _ = require('underscore');

module.exports = {
  //creates a new version an existing version with a new branch name
  createBranch: (req, res) => {
    console.log('version: ', req.body.version);

    let versionId, rootId;
    let branch = {
      branch: req.params.branch
    };
    helpers.makeVersion(req.body.version, branch, req.params.username)
    .then(version => {
      console.log('New Version: ', version);
      versionId = version._id;
      rootId = version.rootVersion;
      return UserRecipe.findOne({
        username: req.params.username
      });
    })
    .then((userRecipeCollection) => {
      console.log('userRecipeCollection: ', userRecipeCollection);
      console.log('userRecipeCollection Recipes: ', userRecipeCollection.recipes);
      let recipe = _.find(userRecipeCollection.recipes, recipe => {
        console.log('REIPCE: ', recipe);
        console.log('root', rootId);
        console.log(recipe.rootRecipeId.equals(rootId));
        return recipe.rootRecipeId.equals(rootId);
      });
      console.log('recipe: ', recipe);
      recipe.branches.push({
        name: req.params.branch,
        mostRecentVersionId: versionId
      });
      console.log('recipe branches: ', recipe.branches);
      console.log('userRecipeCollection: ', userRecipeCollection);
      return UserRecipe.update({
        username: req.params.username
      }, userRecipeCollection);
    })
    .then((updateResults) => {
      console.log('success');
      res.status(201).send(updateResults);
    })
    .catch(error => {
      console.log('failuooore');
      res.status(500).send(error);
    });
  },
  //gets the latest version in a branch
  getBranch: (req, res) => {

  },
  //removes versions with no downstream, makes rest unavailable
  deleteBranch: (req, res) => {

  }
};
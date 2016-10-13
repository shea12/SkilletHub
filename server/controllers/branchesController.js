let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let _ = require('underscore');

module.exports = {
  // description: creates a new version an existing version with a new branch name
  // body: {
  //   versionId: { version object branched from }
  // }
  // params: {
  //   username: username of the person who owns the recipe,
  //   recipe: root recipe id,
  //   branch: name of the branch
  // }
  createBranch: (req, res) => {
    let versionId;
    return Recipe.findOne({
      _id: req.body.versionId
    }).then(recipe => {
      recipe = recipe.toObject();
      delete recipe._id;
      delete recipe.createdAt;
      recipe.branch = req.params.branch;
      return new Recipe(recipe).save();
    }).then(version => {
      versionId = version._id;
      return UserRecipe.findOne({
        username: req.params.username
      });
    }).then((userRecipeCollection) => {
      let recipe = _.find(userRecipeCollection.recipes, recipe => {
        return recipe.rootRecipeId.equals(req.params.recipe);
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
      console.log('Error: ', error);
      res.status(500).send(error);
    });
  },

  // description: gets the latest version in a branch
  // params: {
  //   username: recipe owner username,
  //   recipe: root recipe id,
  //   branch: name of the branch
  // }
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
      return helpers.retrieveVersion(version.mostRecentVersionId);
    }).then(result => {
      res.status(200).send(result);
    }).catch(error => {
      console.log('Error: ', error);
      res.status(404).send(error);
    })
  }
};
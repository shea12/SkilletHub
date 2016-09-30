let helpers = require(`${__dirname}/../helpers.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;
let _ = require('underscore');

module.exports = {
  // Description: Makes a new version from an existing version
  // Input: 
  //   req.body: {
  //     previous: { previous version },
  //     changes: { changes }
  //   }
  // Output: Created version
  createVersion: (req, res) => {
    let newVersion;
    helpers.makeVersion(req.body.previous, req.body.changes)
    .then((version) => {
      newVersion = version;
      return //userid where username
    }).then((userId) => {
      return UserRecipe.find({
        userId: userId
      });
    }).then(userRecipe => {
      let recipeLocation = _.findIndex(userRecipe.recipes, 
        recipe => recipe.rootRecipeId === newVersion.rootRecipeId);
      let recipe = userRecipe[recipeLocation];
      if (newVersion.branch = 'master') {
        recipe.name = newVersion.name;
      }

      let branchLocation = _.findIndex(recipe.branches,
        branch => branch.name === newVersion.branch);
      let branch = recipe[branchLocation];
      branch.mostRecentVersionId = newVersion._id;

      res.status(201).send();
    }).catch(error => {
      res.status(500).send(error)
    });
  },

  //gets a specific version
  getVersion: (req, res) => {
    let branch = req.params.branch;
    UserRecipe.find({
      //add user id here *!*!*!*!
      userId: 1
    }).then(recipes => {
      let recipe = _.where(recipes, {
        //add recipe id here *!*!*!!**!
        rootRecipeId: 1
      });
      let version = _.where(recipe, {
        branch: branch
      });
      return helpers.retrieveVersion(version)
    }).then(result => {
      res.status(200).send(result);
    }).catch(error => {
      res.status(404).send(error)
    })
  },
  
  //removes versions with no downstream, makes others unavailable
  deleteVersion: (req, res) => {

  }
};
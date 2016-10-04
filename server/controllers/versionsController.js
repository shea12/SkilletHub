let helpers = require(`${__dirname}/../helpers.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;
let _ = require('underscore');

module.exports = {
  // description: Makes a new version from an existing version
  // body: {
  //   previous: { previous version },
  //   changes: { changes }
  // }
  createVersion: (req, res) => {
    let newVersion;
    helpers.makeVersion(req.body.previous, req.body.changes, req.params.username)
    .then((version) => {
      newVersion = version;
      return UserRecipe.find({
        username: version.username
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
      return UserRecipe.update({
        username: userRecipe.username
      }, userRecipe);

    }).catch(error => {
      res.status(500).send(error)
    });
  },

  // description: gets a specific version
  getVersion: (req, res) => {
    let branch = req.params.branch;
    UserRecipe.find({
      username: req.params.username
    }).then(recipes => {
      let recipe = _.where(recipes, {
        rootRecipeId: req.params.version
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
  
  // description: removes versions with no downstream, makes others unavailable
  deleteVersion: (req, res) => {

  },

  // description: fork a version
  // body: {
  //   username: 'username of person making the fork'
  //   version: { version forked from },
  // }
  forkVersion: (req, res) => {
    let forkedProps = {
      username: req.body.username,
      branch: 'master'
    };

    helpers.makeVersion(req.body.version, forkedProps, req.body.username)
    .then(forkedVersion => {
      return helpers.addUserRecipesCollection(req.body.username, forkedVersion);
    })
    .then(userRecipesCollectionResults => {
      res.status(201).send(userRecipesCollectionResults);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  }
};
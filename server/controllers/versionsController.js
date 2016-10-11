let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let _ = require('underscore');
let Promise = require('bluebird')

module.exports = {
  // description: Makes a new version from an existing version
  // body: {
  //   previous: { previous version },
  //   changes: { changes }
  // }
  createVersion: (req, res) => {
    var newVersion;
    helpers.makeVersion(req.body.previous, req.body.changes, req.params.username)
    .then((version) => {
      newVersion = version.toObject();
      return UserRecipe.findOne({
        username: version.username
      });
    }).then(userRecipe => {
      let recipeLocation;
      for (var i = 0; i < userRecipe.recipes.length; i++) {
        if (userRecipe.recipes[i].rootRecipeId.equals(newVersion.rootVersion)) {
          recipeLocation = i;
        }
      }
      let recipe = userRecipe.recipes[recipeLocation];
      if (newVersion.branch === 'master' && newVersion.name) {
        recipe.name = newVersion.name.value;
      }
      let branchLocation = _.findIndex(recipe.branches,
        branch => branch.name === newVersion.branch);
      let branch = recipe.branches[branchLocation];
      branch.mostRecentVersionId = newVersion._id;

      helpers.createBatchNotification({
        recipes: {
          $elemMatch: {
            username: req.params.username,
            recipeId: recipe.rootRecipeId
          }
        }
      },{
        username: req.params.username,
        recipeId: branch.mostRecentVersionId,
        text: `A new version was released for ${recipe.name}.`
      });

      return UserRecipe.update({
        username: userRecipe.username
      }, userRecipe);
    }).then((updateResults) => {
      res.status(201).send();
    }).catch(error => {
      console.log('Error: ', error);
      res.status(500).send(error)
    });
  },

  // description: gets a specific version
  getVersion: (req, res) => {
    return helpers.retrieveVersion(req.params.version)
    .then(result => {
      res.status(200).send(result);
    }).catch(error => {
      console.log('Error: ', error);
      res.status(404).send(error)
    });
  },
  
  // description: Retrieve a list of all versions
  getAllVersions: (req, res) => {
    let mostRecent;
    return UserRecipe.findOne({
      username: req.params.username
    }).then(userRecipeCollection => {
      let branches;
      userRecipeCollection.recipes.forEach(recipe => {
        if (recipe.rootRecipeId.equals(req.params.recipe)) {
          branches = recipe.branches;
        }
      });

      branches.forEach(branch => {
        if (branch.name === req.params.branch) {
          mostRecent = branch.mostRecentVersionId;
        }
      });

      return Recipe.find().or([
        {
          _id: req.params.recipe
        }, {
          rootVersion: req.params.recipe
        }
      ]);
    }).then(recipes => {
      let versions = [];
      let findVersion = (id) => {
        let result = _.find(recipes, recipe => {
          return id.equals(recipe._id);
        });
        versions.push(result);
        if (result.previousVersion !== null) {
          findVersion(result.previousVersion);
        }
      };
      findVersion(mostRecent);
      res.status(200).send(versions);
    }).catch(error => {
      console.log('Error: ', error);
      res.status(404).send(error);
    });
  },

  // description: removes versions with no downstream, makes others unavailable
  deleteVersion: (req, res) => {

  },

  // description: fork a version
  // body: {
  //   username: 'username of person making the fork'
  // }
  forkVersion: (req, res) => {
    let retrieve = helpers.retrieveVersion(req.params.version);
    let updateForkCount = Recipe.findOne({
      _id: req.params.recipe
    }).then(rootRecipe => {
      return Recipe.update({
        _id: req.params.recipe        
      }, {
        forkCount: rootRecipe.forkCount + 1
      });
    });

    return Promise.all([retrieve, updateForkCount])
    .spread((version, updated) => {
      helpers.createNotification({
        notificationOwner: req.params.username,
        username: req.body.username,
        recipeId: version._id,
        text: `${req.body.username} forked your recipe ${version.name.value}`
      });

      let forkedProps = {
        username: req.body.username,
        branch: 'master',
        name: version.name
      };
      return helpers.makeVersion(version, forkedProps, req.body.username);
    }).then(forkedVersion => {
      return helpers.addUserRecipesCollection(req.body.username, forkedVersion);
    }).then(userRecipesCollectionResults => {
      res.status(201).send(userRecipesCollectionResults);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(500).send(error);
    });
  }
};
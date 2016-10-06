let Promise = require('bluebird');
let _ = require('underscore');
let db = require(`${__dirname}/schemas.js`);
let Recipe = db.Recipe;
let UserRecipe = db.UserRecipe;
let Dependency = db.Dependency;

const fields = [
  '_id',
  'rootVersion',
  'previousVersion',  
  'deleted',                      
  'branch',            
  'username',  
  'name',                   
  'description',            
  'servings', 
  'cookTime',             
  'skillLevel',            
  'picture',                
  'ingredients',
  'steps'
];

module.exports = {
  //build a version and save it
  makeVersion: (prev, changes, username) => {
    //New recipe
    let newVersion;
    if (prev === 'new') {
      newVersion = {
        rootVersion: null,
        previousVersion: null,
        deleted: false,
        branch: 'master',
        username: username
      };
    //New branch or version
    } else {
      newVersion = {
        rootVersion: prev.rootVersion || prev._id,
        previousVersion: prev._id,
        deleted: prev.deleted,
        branch: prev.branch,
        username: prev.username
      };
    }
    changes.username = username;
    //build new version object
    _.extend(newVersion, changes);
    //insert new version
    return new Recipe(newVersion).save();
  },

  //retrieve a particular version
  retrieveVersion: (versionId) => {
    let built, mostRecentRecipe;

    //get specific version object from version id
    return Recipe.findOne({
      _id: versionId
    }).then(recipe => {
      mostRecentRecipe = recipe;

      //find all recipes that belong to that recipe tree
      let id = recipe.rootVersion || recipe._id;
      return Recipe.find().or([{
        _id: id
      }, {
        rootVersion: id
      }]);
    }).then(recipes => {
      //convert to plain objects
      recipes.forEach((recipe, i) => {
        recipes[i] = recipe.toObject();
      });

      //build history out of recipes
      let history = [];
      let addVersionToHistory = (id) => {
        //find matching version
        matchingVersion = _.find(recipes, recipe => {
          return recipe._id.equals(id);
        });
        history.unshift(matchingVersion);

        //if previous exists
        if (matchingVersion.previousVersion) {
          addVersionToHistory(matchingVersion.previousVersion);
        }
      };
      addVersionToHistory(versionId);
      //iterate through history
      built = history[0];
      for (let i = 1; i < history.length; i++) {
        let currentHistory = history[i];
        //apply each change
        fields.forEach(field => {
          if (currentHistory[field]) {
            //ingredients / steps
            if (Array.isArray(currentHistory[field])) {
              //iterate through array
              for (let j = 0; j < currentHistory[field].length; j++) { 
                //ingredient/step added, changed, or swapped position
                if (currentHistory[field][j].changed) {
                  built[field][currentHistory[field][j].position - 1] = currentHistory[field][j];
                //ingredient/step deleted
                } else {
                  //remove last
                  if (built[field].length > j) {
                    built[field].pop();
                  }
                }
              }
            //previous ver, deleted, root ver, etc
            } else if (_.contains(['_id', 'rootVersion', 'previousVersion', 'branch', 'deleted', 'username'], field)) {
              built[field] = currentHistory[field];
            } else if (currentHistory[field].changed === true) {
              built[field] = currentHistory[field];
            } else if (currentHistory[field].changed === false) {
              built[field] = undefined;
            }
          }
        });
      }
      return UserRecipe.findOne({
        username: built.username
      });
    }).then(userRecipeCollection => {
      let branches;

      let rootVerId = mostRecentRecipe.rootVersion || mostRecentRecipe._id;
      userRecipeCollection.recipes.forEach(recipe => {
        if (rootVerId.equals(recipe.rootRecipeId)) {
          built.branches = recipe.branches;
        }
      });

      return built;
    });
  },
  //from a particular point,
  //for all version below it with no dependencies, delete them
  //for everything else, set them to unavailable
  deleteDownstream: (version) => {

  },

  // description: adds a collection of a user's recipes
  // username: username of collection owner
  // recipe: intial recipe to be added
  addUserRecipesCollection: (username, recipe) => {
    return UserRecipe.findOne({
      username: username
    }).then(result => {
      //first recipe by users
      if (result === null) {
        return new UserRecipe({
          username: username,
          recipes: [
            {
              name: recipe.name.value,
              rootRecipeId: recipe.rootVersion || recipe._id,
              branches: [
                {
                  name: 'master',
                  mostRecentVersionId: recipe._id
                }
              ]
            }
          ]
        }).save();

      //previously existing recipes by user
      } else {
        result.recipes.push({
          name: recipe.name.value,
          rootRecipeId: recipe.rootVersion || recipe._id,
          branches: [
            {
              name: 'master',
              mostRecentVersionId: recipe._id
            }
          ]
        });
        return UserRecipe.update({
          username: username
        }, result);
      }

    });
  }
};
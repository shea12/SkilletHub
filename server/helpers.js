let Promise = require('bluebird');
let _ = require('underscore');
let db = require(`${__dirname}/schemas.js`);
let Recipe = db.Recipe;
let UserRecipe = db.UserRecipe;
let Dependency = db.Dependency;

const fields = [
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
  retrieveVersion: (version) => {
    let currentVersion = version;
    //get versions for branch
    let versions;
    return Recipe.find({
      branch: currentVersion.branch
    }).then(results => {
      versions = results;

      //build up history
      let history = [version];
      //until reach root
      while (currentVersion.previousVersion !== null) {
        //find previous version
        currentVersion = _.find(versions, ver => {
          return ver._id.equals(currentVersion.previousVersion);
        });
        //add previous version to history
        history.unshift(currentVersion);
      }
      //iterate through history
      let built = history[0];
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
                  built[field].pop();
                }
              }
              //previous ver, deleted, root ver, etc
            } else if (_.contains(['rootVersion', 'previousVersion', 'branch', 'deleted', 'username'], field)) {
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
      }).then(userRecipeCollection => {
        let branches;

        built = built.toObject();
        let rootVer = version.rootVersion || version._id;
        userRecipeCollection.recipes.forEach(recipe => {
          if (rootVer.equals(recipe.rootRecipeId)) {
            built.branches = recipe.branches;
          }
        });
        return built;
      }).catch(error => {
        return error;
      });
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
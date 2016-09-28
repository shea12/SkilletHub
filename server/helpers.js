let Promise = require('bluebird');
let _ = require('underscore');
let db = require(`${__dirname}/schemas.js`);
let Recipe = db.Recipe;
let UserRecipe = db.UserRecipe;
let Dependency = db.Dependency;

module.exports = {
  //build a version and save it
  makeVersion: (prev, changes) => {
    //New recipe
    var newVersion;
    if (prev === 'new') {
      newVersion = {
        rootVersion: null,
        previousVersion: null,
        deleted: false,
        branch: {
          changed: true,
          value: 'master' 
        },
        stars: 0
      };
    //New branch or version
    } else {
      newVersion = {
        rootVersion: prev.rootVersion,
        previousVersion: prev.id,
      };
    }
    //build new version object
    _.extend(newVersion, changes);

    //insert new version
    return new Recipe(newVersion).save()
  },
  //retrieve a particular version
  retrieveVersion: (version) => {

  },
  //from a particular point,
  //for all version below it with no dependencies, delete them
  //for everything else, set them to unavailable
  deleteDownstream: (version) => {

  }
};
let db = require(`${__dirname}/../schemas.js`);
let helpers = require(`${__dirname}/../helpers.js`);
let Recipe = db.Recipe;
let UserRecipe = db.UserRecipe;
let Tag = db.Tag;
let _ = require('underscore');
let Promise = require('bluebird');
module.exports = {
  // description: Returns a list of recipes by relevancy to a given search string
  // params: {
  //   string: 'search string'
  // }
  search: (req, res) => {
    //build a query for each word in search string
    let searchTerms = req.params.string.split('+');
    let queries = searchTerms.map(term => {
      return Recipe.find({
        'name.value': new RegExp(term, 'i')
      });
    });
    
    //execute all queries
    return Promise.all(queries)
    .spread((...queryResults) => {
      //group by rootVersionid
      let uniqueRoots = (results) => {
        let unique = {};
        results.forEach(result => {
          unique[result.rootVersion || result._id] = result;          
        });
        results = _.values(unique);
        return results;
      };

      let uniqueQueryResults = [];
      queryResults.forEach(result => { uniqueQueryResults.push(uniqueRoots(result)) });

      //join results
      let joinedResults = uniqueQueryResults.length > 0 ? uniqueQueryResults[0].concat(...uniqueQueryResults.slice(1)) : [];

      //tally appearances between queries
      let appearances = {};
      joinedResults.forEach((result) => {
        if (!appearances[result.rootVersion || result._id]) {
          appearances[result.rootVersion || result._id] = 0;
        }
        appearances[result.rootVersion || result._id]++;
      });

      //sort based on # of appearances
      let sortedRecipes = _.pairs(appearances)
      .sort((a, b) => {
        return b[1] - a[1];
      }).map(recipe => {
        return joinedResults.find(queryResult => {
          let id = queryResult.rootVersion || queryResult._id;
          return id.equals(recipe[0]);
        });
      });

      //get full versions
      let sortedFullRecipes = [];
      sortedRecipes.forEach(result => {
        let fullRecipe = UserRecipe.findOne({
          username: result.username
        }).then(userRecipesCollection => {
          let recipe = _.find(userRecipesCollection.recipes, recipe => {
            return recipe.rootRecipeId.equals(result.rootVersion || result._id);
          });
          let version = _.find(recipe.branches, currentBranch => {
            return currentBranch.name === result.branch;
          });

          return helpers.retrieveVersion(version.mostRecentVersionId);
        });

        sortedFullRecipes.push(fullRecipe);
      });
      return Promise.all(sortedFullRecipes);
    }).spread((...fullRecipes) => {
      //return sorted by appearances
      res.status(200).send(fullRecipes);
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(404).send(error);
    });
  }, 

  explore: (req, res) => {
    let lengthOfResults = {};
    let byForks = Recipe.find({
      rootVersion: null,
      previousVersion: null
    }).sort({
      forkCount: 'desc'
    });
    let byDate = Recipe.find().sort({
      createdAt: 'desc'
    });
    let byRandom = Recipe.find({
      rootVersion: null,
      previousVersion: null
    });

    return Promise.all([byForks, byDate, byRandom])
    .spread((byFork, byDate, byRandom) => {
      let getLatest = (recipes) => {
        return recipes.map(currentRecipe => {
          return UserRecipe.findOne({
            username: currentRecipe.username
          }).then(userRecipesCollection => {
            // console.log('userRecipesCollection.recipes: ', userRecipesCollection.recipes);
            let recipe = _.find(userRecipesCollection.recipes, recipe => {
              return recipe.rootRecipeId.equals(currentRecipe.rootVersion || currentRecipe._id);
            });
            let version = _.find(recipe.branches, currentBranch => {
              return currentBranch.name === 'master';
            });

            return helpers.retrieveVersion(version.mostRecentVersionId);
          });
        });
      };

      //by fork
      let topTenForked = byFork.slice(0, 10);
      let fullTopTenForked = getLatest(topTenForked);
      lengthOfResults.forks = fullTopTenForked.length;

      //by date
      let uniqueVersionIds = {};
      let topTenByDate = [];
      byDate.forEach(recipe => {
        if (topTenByDate.length < 10 && !uniqueVersionIds[recipe.rootVersion || recipe._id]) {
          uniqueVersionIds[recipe.rootVersion || recipe._id] = true;
          topTenByDate.push(recipe);
        }
      });
      let fullTopTenByDate = getLatest(topTenByDate);
      lengthOfResults.dates = fullTopTenByDate.length;

      //by random
      let topTenByRandom = [];
      for (let i = 0; i < 10; i++) {
        if (byRandom.length > 0) {
          topTenByRandom.push(byRandom.splice(Math.floor(Math.random(byRandom.length)), 1)[0]);
        }
      }
      let fullTopTenByRandom = getLatest(topTenByRandom);
      lengthOfResults.random = fullTopTenByDate.length;

      let results = fullTopTenForked.concat(fullTopTenByDate, fullTopTenByRandom);

      return Promise.all(results);

    }).spread((...results) => {
      let exploreRecipes = {
        byForks: results.slice(0, lengthOfResults.forks),
        byDates: results.slice(lengthOfResults.forks, lengthOfResults.forks + lengthOfResults.dates),
        byRandom: results.slice(lengthOfResults.forks + lengthOfResults.dates),
      };

      res.status(200).send(exploreRecipes);
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send(error);
    })
  },

  // description: Returns a list of tags
  tags: (req, res) => {
    Tag.find().then(tags => {
      res.status(200).send(tags);
    }).catch(error => {
      console.log('error: ', error);
    });
  }
};
let db = require(`${__dirname}/../schemas.js`);
let Recipe = db.Recipe;
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
    console.log('SEARCH TERMS: ', searchTerms);
    let queries = searchTerms.map(term => {
      return Recipe.find({
        'name.value': new RegExp(term, 'i')
      });
    });
    
    //execute all queries
    return Promise.all(queries)
    .spread((...queryResults) => {
      //join results
      let joinedResults = queryResults.length > 0 ? queryResults[0].concat(...queryResults.slice(1)) : [];

      //tally appearances between queries
      let appearances = {};
      joinedResults.forEach((result) => {
        if (!appearances[result._id]) {
          appearances[result._id] = 0;
        }
        appearances[result._id]++;
      });
      console.log('appearances: ', appearances);

      //sort based on # of appearances
      let sortedRecipes = _.pairs(appearances)
      .sort((a, b) => {
        return b[1] - a[1];
      }).map(recipe => {
        return joinedResults.find((queryResult) => {
          return queryResult._id.equals(recipe[0]);
        });
      });
      console.log('sorted recipes: ', sortedRecipes);

      //return sorted by appearances
      res.status(200).send(sortedRecipes);
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(404).send(error);
    });
  }
};
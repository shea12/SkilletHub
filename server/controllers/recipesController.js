let helpers = require(`${__dirname}/../helpers.js`);
let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;

module.exports = {
  // Description: Makes a new recipe
  // Input: req.body: { recipe changes }
  // Output: created version
  createRecipe: (req, res) => {
    helpers.makeVersion('new', req.body)
    .then(result => {
      return helpers.addUserRecipeCollection(req.params.username, result);
    }).then(function() {
      res.status(201).send();
    }).catch(error => {
      res.status(500).send(error)
    });
  },

  // Description: Gets latest version in master
  // Input: req.params.recipe = recipeId
  // Output: { Recipe }
  getRecipe: (req, res) => {
    let branch = 'master';
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
      res.status(404).send(error);
    })
  },
  
  //Description: Removes versions with no downstream, makes others unavailable
  //Input: 
  //Output: 
  deleteRecipe: (req, res) => {

  }
};
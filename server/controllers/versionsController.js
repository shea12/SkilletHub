let helpers = require(`${__dirname}/../helpers.js`);

module.exports = {
  // Description: Makes a new version from an existing version
  // Input: 
  //   req.body: {
  //     previous: { previous version },
  //     changes: { changes }
  //   }
  // Output: Created version
  createVersion: (req, res) => {
    helpers.makeVersion(req.body.previous, req.body.changes)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(error => {
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
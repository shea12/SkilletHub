let helpers = require(`${__dirname}/../helpers.js`);

module.exports = {
  // Description: Makes a new recipe
  // Input: req.body: { recipe changes }
  // Output: created version
  createRecipe: (req, res) => {
    helpers.makeVersion('new', req.body)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  },

  //gets latest version in master
  getRecipe: (req, res) => {

  },
  
  //removes versions with no downstream, makes others unavailable
  deleteRecipe: (req, res) => {

  }
};
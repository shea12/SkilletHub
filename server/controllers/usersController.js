let UserRecipe = require(`${__dirname}/../schemas.js`).UserRecipe;

module.exports = {
  signup: (req, res) => {

  },

  login: (req, res) => {

  },

  logout: (req, res) => {

  },

  //Gets all the recipes that belong to that user
  getProfile: (req, res) => {
    UserRecipe.findOne({
      username: req.params.username
    }).then(result => {
      res.status(200).send(result);
    }).catch(error => {
      res.status(404).send(error);
    });
  }
};
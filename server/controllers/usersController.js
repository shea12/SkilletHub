let UserRecipes = require(`${__dirname}/../schemas.js`).UserRecipes;

module.exports = {
  signup: (req, res) => {

  },

  login: (req, res) => {

  },

  logout: (req, res) => {

  },

  //Gets all the recipes that belong to that user
  getProfile: (req, res) => {
    //find user
    //userId where username: req.params.username
  //   .then((userId) => {
  //     //find recipes by user
  //     return UserRecipes.findOne({userId: userId});
  //   }).then(result => {
  //     res.status(200).send(result);
  //   }).catch(error => {
  //     res.status(404).send(error);
  //   });
  }
};
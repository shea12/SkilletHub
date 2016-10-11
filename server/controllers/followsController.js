let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let Recipe = db.Recipe;
let Follow = db.Follow;
let Notification = db.Notification;
let _ = require('underscore');
let Promise = require('bluebird')

// app.get('/:username/get-notifications', follows.getNotifications);
// app.post('/:username/follow/:user', follows.followUser);  
// app.post('/:username/follow/:user/:recipe', follows.followRecipe);  
// app.delete('/:username/unfollow/:user', follows.unfollowUser);
// app.delete('/:username/unfollow/:user/:recipe', follows.unfollowRecipe);

module.exports = {
  // description: Returns a list of all notifications for a user
  // params: {
  //   username: username of owner of the notifications,
  // }
  getNotifications: (req, res) => {

  },

  // description: Follows a user
  // params: {
  //   username: username of person following another
  //   user: username of the person being followed
  // }
  followUser: (req, res) => {
    return Follow.findOne({
      username: req.params.username
    }).then(follow => {

      if (!follow) {
        return new Follow({
          username: req.params.username,
          users: [req.params.user]
        }).save().then(() => {
          res.status(201).send();
        });

      } else {
        let users = follow.users;
        users.push(req.params.user);

        return Follow.update({
          username: req.params.username
        }, {
          users: users
        }).then(() => {
          res.status(200).send();
        });
      }
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send(error);
    });
  },

  // description: Follows a recipe
  // params: {
  //   username: username of the person following a recipe
  //   user: username of the person the recipe belongs to
  //   recipe: root recipe id of the recipe being followed
  // }
  followRecipe: (req, res) => {
    return Follow.findOne({
      username: req.params.username
    }).then(follow => {
      
      if (!follow) {
        return new Follow({
          username: req.params.username,
          recipes: [{
            username: req.params.user,
            recipeId: req.params.recipe
          }]
        }).save().then(() => {
          res.status(201).send();
        });

      } else {
        let recipes = follow.recipes;
        recipes.push({
          username: req.params.user,
          recipeId: req.params.recipe
        });

        return Follow.update({
          username: req.params.username
        }, {
          recipes: recipes
        }).then(() => {
          res.status(200).send();
        });
      }
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send(error);
    });
  },

  // description: Unfollows a user
  // params: {
  //   username: username of person following another
  //   user: username of the person being followed
  // }
  unfollowUser: (req, res) => {
    Follow.findOne({
      username: req.params.username
    }).then(follow => {
      let userIndex = _.findIndex(follow.users, user => {
        return user === req.params.user;
      });
      let users = follow.users;
      users.splice(userIndex, 1);

      return Follow.update({
        username: req.params.username
      }, {
        users: users
      });
    }).then(() => {
      res.status(200).send();
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send();
    });
  },

  // description: Unfollows a Recipe
  // params: {
  //   username: username of the person following a recipe
  //   user: username of the person the recipe belongs to
  //   recipe: root recipe id of the recipe being followed
  // }
  unfollowRecipe: (req, res) => {
    Follow.findOne({
      username: req.params.username
    }).then(follow => {
      let recipeIndex = _.findIndex(follow.recipes, recipe => {
        return recipe.username === req.params.user && recipe.recipeId.equals(req.params.recipe);
      });
      let recipes = follow.recipes;
      recipes.splice(recipeIndex, 1);

      return Follow.update({
        username: req.params.username
      }, {
        recipes: recipes
      });
    }).then(() => {
      res.status(200).send();
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send();
    });
  }


  /* DONT FORGEt FOLLOWER COUNT */
};
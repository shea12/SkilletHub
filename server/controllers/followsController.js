let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let Recipe = db.Recipe;
let Follow = db.Follow;
let User = db.User;
let Notification = db.Notification;
let _ = require('underscore');
let Promise = require('bluebird')

module.exports = {
  // description: Returns a list of all followed users
  // params: {
  //   username: username of the person following the users
  // }
  getFollowedUsers: (req ,res) => {
    return Follow.findOne({
      username: req.params.username
    }).then(follows => {
      res.status(200).send(follows.users);
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(404).send();
    });
  },

  // description: Returns a list of all notifications for a user
  // params: {
  //   username: username of owner of the notifications,
  // }
  getNotifications: (req, res) => {
    return Notification.find({
      username: req.params.username
    }).then(notifications => {
      res.status(200).send(notifications);
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send();
    });
  },

  // description: Follows a user
  // params: {
  //   username: username of person following another
  //   user: username of the person being followed
  // }
  followUser: (req, res) => {
    let findFollow = Follow.findOne({
      username: req.params.username
    });
    let findUser = User.findOne({
      username: req.params.user
    });
    let notifyUser = helpers.createNotification({
      notificationOwner: req.params.user,
      username: req.params.user,
      text: `${req.params.username} started following you.`
    });

    return Promise.all([findFollow, findUser, notifyUser])
    .spread((follow, user, notification) => {
      let followers = user.followers;
      followers++;
      let updateFollowers = User.update({
        username: req.params.user
      }, {
        followers: followers
      });

      if (!follow) {
        return new Follow({
          username: req.params.username,
          users: [req.params.user]
        }).save()
        .then(() => {
          return updateFollowers;
        }).then(() => {
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
          return updateFollowers;
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
    return Recipe.findOne({
      _id: req.params.recipe,
      username: req.params.user
    }).then(recipe => {
      let findFollow = Follow.findOne({
        username: req.params.username
      });
      let notifyUser = helpers.createNotification({
        notificationOwner: req.params.user,
        username: req.params.username,
        recipeId: req.params.recipe,
        text: `${req.params.username} followed your recipe ${recipe.name.value}.`
      });

      return Promise.all([findFollow, helpers.updateRecipeFollowers(req.params.user, req.params.recipe, 1)], notifyUser);
    }).spread((follow, followerCountUpdate, notification) => {
      
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
    let findFollow = Follow.findOne({
      username: req.params.username
    })
    let findUser = User.findOne({
      username: req.params.user
    });

    return Promise.all([findFollow, findUser])
    .spread((follow, user) => {
      let followers = user.followers;
      if (followers > 0) {
        followers--;
      }
      let updateFollowerCount = User.update({
        username: req.params.user
      }, {
        followers: followers
      });

      let userIndex = _.findIndex(follow.users, user => {
        return user === req.params.user;
      });
      let users = follow.users;
      users.splice(userIndex, 1);

      let updateFollowers = Follow.update({
        username: req.params.username
      }, {
        users: users
      });

      return Promise.all([updateFollowers, updateFollowerCount]);
    }).spread(() => {
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
    let findFollow = Follow.findOne({
      username: req.params.username
    });

    Promise.all([findFollow, helpers.updateRecipeFollowers(req.params.user, req.params.recipe, -1)])
    .spread((follow, followerCountUpdate) => {
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
};
let users = require(`${__dirname}/controllers/usersController.js`);
let recipes = require(`${__dirname}/controllers/recipesController.js`);
let branches = require(`${__dirname}/controllers/branchesController.js`);
let versions = require(`${__dirname}/controllers/versionsController.js`);
let pullRequests = require(`${__dirname}/controllers/pullRequestController.js`);
let search = require(`${__dirname}/controllers/searchController.js`);
let issues = require(`${__dirname}/controllers/issuesController.js`);
let follows = require(`${__dirname}/controllers/followsController.js`);

module.exports = function(app, express) {
  /*** Following ***/
  app.get('/:username/get-followed-users', follows.getFollowedUsers);
  app.get('/:username/get-notifications', follows.getNotifications);
  app.post('/:username/follow/:user', follows.followUser);  
  app.post('/:username/follow/:user/:recipe', follows.followRecipe);  
  app.delete('/:username/unfollow/:user', follows.unfollowUser);
  app.delete('/:username/unfollow/:user/:recipe', follows.unfollowRecipe);

  /*** Issues ***/
  app.get('/:username/:recipe/get-issues', issues.getIssues);
  app.post('/:username/:recipe/create-issue', issues.createIssue);
  app.post('/:username/:issue/create-comment', issues.createComment);
  app.put('/:username/:recipe/update-status', issues.updateStatus);

  /*** Search ***/
  app.get('/tags', search.tags);
  app.get('/explore', search.explore);
  app.get('/search/:string', search.search);

  /*** Sign up / Sign in / Logout ***/
  app.post('/user/signup', users.signup);
  app.post('/user/login', users.login);
  app.post('/user/logout', users.logout);

  /*** Pull Requests ***/
  app.post('/:username/create-pull', pullRequests.createPullRequest);
  app.put('/:username/:pullId/update-pull', pullRequests.updatePullRequestStatus);
  app.get('/:username/get-pulls', pullRequests.getAllPullRequests);

  /*** Users ***/
  app.get('/:username/profile', users.getProfile); //gets recipes

  /*** Recipes ***/
  app.post('/:username/create-recipe', recipes.createRecipe);
  app.get('/:username/:recipe', recipes.getRecipe); 

  /*** Branches ***/
  app.post('/:username/:recipe/:branch', branches.createBranch);
  app.get('/:username/:recipe/:branch', branches.getBranch);

  /*** Versions ***/
  app.get('/:username/:recipe/:branch/versions', versions.getAllVersions);
  app.post('/:username/:recipe/:branch/create-version', versions.createVersion);
  app.get('/:username/:recipe/:branch/:version', versions.getVersion);
  app.post('/:username/:recipe/:branch/:version/fork', versions.forkVersion);
};
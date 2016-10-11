let users = require(`${__dirname}/controllers/usersController.js`);
let recipes = require(`${__dirname}/controllers/recipesController.js`);
let branches = require(`${__dirname}/controllers/branchesController.js`);
let versions = require(`${__dirname}/controllers/versionsController.js`);
let pullRequests = require(`${__dirname}/controllers/pullRequestController.js`);
let search = require(`${__dirname}/controllers/searchController.js`);
let issues = require(`${__dirname}/controllers/issuesController.js`);

module.exports = function(app, express) {
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
  // app.put('/:username/profile', users.updateProfile);

  /*** Recipes ***/
  app.post('/:username/create-recipe', recipes.createRecipe);
  app.get('/:username/:recipe', recipes.getRecipe); 
  app.delete('/:username/:recipe', recipes.deleteRecipe);

  /*** Branches ***/
  app.post('/:username/:recipe/:branch', branches.createBranch);
  app.get('/:username/:recipe/:branch', branches.getBranch);
  app.delete('/:username/:recipe/:branch', branches.deleteBranch);

  /*** Versions ***/
  app.get('/:username/:recipe/:branch/versions', versions.getAllVersions);
  app.post('/:username/:recipe/:branch/create-version', versions.createVersion);
  app.get('/:username/:recipe/:branch/:version', versions.getVersion);
  app.delete('/:username/:recipe/:branch/:version', versions.deleteVersion);  
  app.post('/:username/:recipe/:branch/:version/fork', versions.forkVersion);
};
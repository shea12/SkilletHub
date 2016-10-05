let helpers = require(`${__dirname}/../helpers.js`);
let PullRequest = require(`${__dirname}/../schemas.js`).PullRequest;
let _ = require('underscore');

  // sendingUser: String,
  // receivingUser: String,
  // sentVersion: Schema.Types.ObjectId,
  // receivingVersion: Schema.Types.ObjectId,
  // resultVersion: Schema.Types.ObjectId,
  // status: String,
  // createdAt: { type: Date, default: Date.now },
  // resolvedAt: Date
module.exports = {
  // description: Creates a pull request
  createPullRequest: {

  },

  // description: Updates the status of a pull request
  updatePullRequestStatus: {

  },

  // description: Retrieves a list of all the user's pull requests
  getAllPullRequests: {

  },

  // description: Retrieve a single pull request
  getPullRequest: {

  }
};
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

  // app.post('/:username/create-pull', pullRequests.createPullRequest);
  // app.put('/:username/:pullId', pullRequests.updatePullRequestStatus);
  // app.get('/:username/:pullId', pullRequests.getPullRequest);
  // app.get('/:username/get-pulls', pullRequests.getAllPullRequests);
module.exports = {
  // description: Creates a pull request
  // params: {
  //   targetUsername: 'username of target',
  //   sourceVersionId: _id of source version,
  //   targetVersionId: _id of target version
  // }
  createPullRequest: (req, res) => {
    return new PullRequest({
      sendingUser: req.params.username,
      receivingUser: req.params.targetUsername,
      sentVersion: req.params.sourceVersionId,
      receivingVersion: req.params.targetVersionId,
      status: 'open',
    }).save().then(pullRequest => {
      console.log('pullRequest: ', pullRequest);
      res.status(201).send(pullRequest);
    }).catch(error => {
      console.log('error: ', error);
      res.status(500).send(error);
    });
  },

  // description: Updates the status of a pull request
  updatePullRequestStatus: (req, res) => {
    //update resolvedAt, status
  },

  // description: Retrieves a list of all the user's pull requests
  getAllPullRequests: (req, res) => {

  },

  // description: Retrieve a single pull request
  getPullRequest: (req, res) => {

  }
};
let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let PullRequest = db.PullRequest;
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
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
  // app.put('/:username/:pullId/update-pull', pullRequests.updatePullRequestStatus);
  // app.get('/:username/:pullId/get-pull', pullRequests.getPullRequest);
  // app.get('/:username/get-pulls', pullRequests.getAllPullRequests);
module.exports = {
  // description: Creates a pull request
  // body: {
  //   targetUsername: 'username of target',
  //   sourceVersionId: _id of source version,
  //   targetVersionId: _id of target version
  // }
  createPullRequest: (req, res) => {
    return new PullRequest({
      sendingUser: req.params.username,
      receivingUser: req.body.targetUsername,
      sentVersion: req.body.sourceVersionId,
      receivingVersion: req.body.targetVersionId,
      status: 'open',
    }).save().then(pullRequest => {
      res.status(201).send(pullRequest);
    }).catch(error => {
      res.status(500).send(error);
    });
  },

  // description: Updates the status of a pull request
  // body: {
  //   status: 'merged or closed',
  //   changes: 'OPTIONAL: { changes }'
  // }
  updatePullRequestStatus: (req, res) => {
    //update resolvedAt, status
    PullRequest.update({
      _id: req.params.pullId
    }, {
      status: req.body.status,
      resolvedAt: new Date()
    });

    //was modified
    if (req.body.hasOwnProperty(changes)) {

      //PUT CREATE NEW VERSION STUFF HERE

    //was not modified
    } else {

    }
  },

  // description: Retrieves a list of all the user's pull requests
  getAllPullRequests: (req, res) => {
    //order by puller/pullee, status, time created, time modified
  },

  // description: Retrieve a single pull request
  getPullRequest: (req, res) => {

  }
};
let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let PullRequest = db.PullRequest;
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let _ = require('underscore');
let Promise = require('bluebird');
let http = require('http');
let Buffer = require('buffer').Buffer;
let querystring = require('querystring');

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
      targetUser: req.body.targetUsername,
      sentVersion: req.body.sourceVersionId,
      targetVersion: req.body.targetVersionId,
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
  // params : {
  //   username: 'target username',
  //   pullId: id of pull request
  // }
  updatePullRequestStatus: (req, res) => {
    //update resolvedAt, status
    return PullRequest.update({
      _id: req.params.pullId
    }, {
      status: req.body.status,
      resolvedAt: new Date()

    }).then(() => {
      return PullRequest.findOne({
        _id: req.params.pullId
      });
    }).then(pullRequest => {
      let source = Recipe.findOne({
        _id: pullRequest.sentVersion
      });
      let target = Recipe.findOne({
        _id: pullRequest.targetVersion
      });
      return Promise.all([source, target]);
    }).spread((sourceRecipe, targetRecipe) => {

      let deleteFields = obj => {
        let fields = ['_id', 'rootVersion', 'previousVersion', 'deleted', 'branch', 'username', 'createdAt'];
        fields.forEach(field => {
          delete obj[field];
        });
        return obj;
      };
      
      let postData = {
        previous: targetRecipe
      };

      if (req.body.hasOwnProperty('changes')) {
        deleteFields(req.body.changes);
        postData.changes = req.body.changes;
      } else {
        sourceRecipe = sourceRecipe.toObject();
        deleteFields(sourceRecipe);
        postData.changes = sourceRecipe;
      }
      postData = JSON.stringify(postData);

      let options = {
        host: 'localhost',
        port: '3000',
        path: `/${targetRecipe.username}/${targetRecipe.rootVersion || targetRecipe._id}/${targetRecipe.branch}/create-version`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      let data;
      let versionRequest = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          data = chunk;
        });
        response.on('end', () => {
          res.status(201).send(data);
        });
      });

      // write the request parameters
      versionRequest.write(postData);
      return versionRequest.end();

    }).catch(error => {
      res.status(500).send();
    });

  },

  // description: Retrieves a list of all the user's pull requests
  getAllPullRequests: (req, res) => {
    //order by puller/pullee, status, time created, time modified
  },

  // description: Retrieve a single pull request
  getPullRequest: (req, res) => {

  }
};
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

    }).then((update) => {
      return PullRequest.findOne({
        _id: req.params.pullId
      });
    }).then(pullRequest => {
      return Recipe.findOne({
        _id: pullRequest.targetVersion
      });
    }).then(recipe => {
      //was modified
      if (req.body.hasOwnProperty('changes')) {
        let postData = JSON.stringify({
          previous: recipe,
          changes: req.body.changes
        });

        let options = {
          host: 'localhost',
          port: '3000',
          path: `/${recipe.username}/${recipe.rootVersion || recipe._id}/${recipe.branch}/create-version`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        let data = '';
        let versionRequest = http.request(options, (response) => {
          response.setEncoding('utf8');
          response.on('data', (chunk) => {
            data = chunk;
          });
          response.on('end', () => {
            console.log('DATA: ', data);
            res.status(201).send();
          });
        });

        // write the request parameters
        versionRequest.write(postData);
        return versionRequest.end();

      //was not modified
      } else {
        res.status(200).send();      
      }
    }).catch(error => {
      console.log('ERROR main: ', error);
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
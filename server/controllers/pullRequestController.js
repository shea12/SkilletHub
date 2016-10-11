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

module.exports = {
  // description: Creates a pull request
  // body: {
  //   targetUsername: 'username of target',
  //   sourceVersionId: _id of source version,
  //   targetVersionId: _id of target version
  // }
  createPullRequest: (req, res) => {
    let sentVer = Recipe.findOne({
      _id: req.body.sourceVersionId
    });
    let rootVer = Recipe.findOne({
      _id: req.body.targetVersionId
    });

    return Promise.all([sentVer, rootVer])
    .spread((sentVersion, targetVersion) => {
      helpers.createNotification({
        notificationOwner: req.body.targetUsername,
        username: req.params.username,
        recipeId: req.body.targetVersionId,
        text: `${req.params.username} sent you a pull request.`
      });

      return new PullRequest({
        sendingUser: req.params.username,
        targetUser: req.body.targetUsername,
        sentVersion: req.body.sourceVersionId,
        sentRootVersion: sentVersion.rootVersion || sentVersion._id,
        sentBranch: sentVersion.branch,
        targetVersion: req.body.targetVersionId,
        targetRootVersion: targetVersion.rootVersion || targetVersion._id,
        targetBranch: targetVersion.branch,
        status: 'open'
      }).save();
    }).then(pullRequest => {
      res.status(201).send(pullRequest);
    }).catch(error => {
      console.log('Error: ', error);
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
      let source = helpers.retrieveVersion(pullRequest.sentVersion);
      let target = Recipe.findOne({
        _id: pullRequest.targetVersion
      });
      return Promise.all([source, target]);
    }).spread((sourceRecipe, targetRecipe) => {

      let notification = {
        notificationOwner: sourceRecipe.username,
        username: req.params.username,
        recipeId: sourceRecipe._id,
      };
      if (req.body.status === 'closed') {
        notification.text = `${req.params.username} rejected your pull request.`
      } else {
        notification.text = `${req.params.username} approved your pull request`
      }
      helpers.createNotification(notification);

      if (req.body.status !== 'closed') {

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
      } else {
        res.status(200).send();
      }
    }).catch(error => {
      console.log('Error: ', error);
      res.status(500).send();
    });

  },

  // description: Retrieves a list of all the user's pull requests
  // params : {
  //   username: "username to get pull requests for"
  // }
  getAllPullRequests: (req, res) => {
    return PullRequest.find().or([{
      sendingUser: req.params.username
    }, {
      targetUser: req.params.username
    }]).then(pulls => {
      let sentPulls = _.filter(pulls, pull => { return pull.sendingUser === req.params.username });
      let receivedPulls = _.filter(pulls, pull => { return pull.targetUser === req.params.username });
      sentPulls = _.sortBy(sentPulls, 'createdAt');
      receivedPulls = _.sortBy(receivedPulls, 'createdAt');

      let pullRequests = {
        sent: sentPulls,
        received: receivedPulls
      };
      res.status(200).send(pullRequests);
    }).catch(error => {
      console.log('Error: ', error);
      res.status(404).send(error);
    });
  }
};
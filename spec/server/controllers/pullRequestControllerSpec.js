var mongoose = require('mongoose');
var db = require(`${__dirname}/../../../server/schemas.js`);
var PullRequest = db.PullRequest;
var Recipe = db.Recipe;
var generateId = mongoose.Types.ObjectId;

var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var req, res;
var Promise = require('bluebird');

var pullRequestController = require(`${__dirname}/../../../server/controllers/pullRequestController.js`);
var createPullRequest = pullRequestController.createPullRequest;
var updatePullRequestStatus = pullRequestController.updatePullRequestStatus;
var getAllPullRequests = pullRequestController.getAllPullRequests;
var getPullRequest = pullRequestController.getPullRequest;

describe('pullRequestController.js', function() {
  //connect to testing db, disconnect afterwards
  before(function() {
    mongoose.connect('mongodb://localhost/mochaTesting');
  });

  after(function() {
    return PullRequest.remove({})
    .then(function() {
      return Recipe.remove({});
    }).then(function() {
      mongoose.connection.close();
    });
  });

  describe('createPullRequest()', function() {
    var sourceId = generateId();
    var targetId = generateId();
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/:username/create-pull',
        params: {
          username: 'justin'
        },
        body: {
          targetUsername: 'obama',
          sourceVersionId: sourceId,
          targetVersionId: targetId
        }
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(createPullRequest).to.be.a('function');
    });
    // it('should insert a pullRequest object into the database', function() {
    //   return createPullRequest(req, res)
    //   .then(function() {
    //     var response = res._getData();
    //     console.log('RESPONSE: ', response);
    //     expect(response.sendingUser).to.equal('justin');
    //     expect(response.targetUser).to.equal('obama');
    //     expect(response.sentVersion.equals(req.body.sourceVersionId)).to.be.true;
    //     expect(response.targetVersion.equals(req.body.targetVersionId)).to.be.true;
    //     expect(response.status).to.equal('open');
    //   });
    // });
  });

  describe('updatePullRequestStatus()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'PUT',
        url: '',
        params: {
          
        }
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(updatePullRequestStatus).to.be.a('function');
    });
  });

  describe('getAllPullRequests()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '',
        params: {
          
        }
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(getAllPullRequests).to.be.a('function');
    });
  });

  describe('getPullRequest()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '',
        params: {
          
        }
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(getAllPullRequests).to.be.a('function');
    });
  });
});
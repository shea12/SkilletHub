var mongoose = require('mongoose');
var db = require(`${__dirname}/../../../server/schemas.js`);
var PullRequest = db.PullRequest;
var Recipe = db.Recipe;
var generateId = mongoose.Types.ObjectId;

var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var Promise = require('bluebird');

var pullRequestController = require(`${__dirname}/../../../server/controllers/pullRequestController.js`);
var createPullRequest = pullRequestController.createPullRequest;
var updatePullRequestStatus = pullRequestController.updatePullRequestStatus;
var getAllPullRequests = pullRequestController.getAllPullRequests;
var getPullRequest = pullRequestController.getPullRequest;

describe('pullRequestController.js', function() {
  describe('createPullRequest()', function() {
    it('should be a function', function() {
      expect(createPullRequest).to.be.a('function');
    });
  });

  describe('updatePullRequestStatus()', function() {
    it('should be a function', function() {
      expect(updatePullRequestStatus).to.be.a('function');
    });
  });

  describe('getAllPullRequests()', function() {
    it('should be a function', function() {
      expect(getAllPullRequests).to.be.a('function');
    });
  });

  describe('getPullRequest()', function() {
    it('should be a function', function() {
      expect(getAllPullRequests).to.be.a('function');
    });
  });
});
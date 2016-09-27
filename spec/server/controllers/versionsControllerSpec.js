var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var ctrl = require('../../../server/controllers/versionsController.js');
var createVersion = ctrl.createVersion;
var getVersion = ctrl.getVersion;
var deleteVersion = ctrl.getVersion;
var req, res;

describe('versionsController.js', function() {
  describe('createVersion()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/user/recipe/branch/version',
        body: {

        }
      });
      res = httpMocks.createResponse()
    });

    it('should be a function', function() {
      expect(createVersion).to.be.a('function');
    });
    it('should respond with success if creation handled successfully', function() {

    });
    it('should respond with an error if creation handled unsuccessfully', function() {

    });
  });

  describe('getVersion()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/user/recipe/branch/version',
      });
      res = httpMocks.createResponse()
    });

    it('should be a function', function() {
      expect(getVersion).to.be.a('function');
    });
    it('should return a complete recipe', function() {

    });
    it('should return the correct version', function() {

    });
    it('should respond with a 404 if no results', function() {
      expect().to.be.equal(404);
    });
    it('should respond with error if unable to get results', function() {

    });
  });

  describe('deleteVersion()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'DELETE',
        url: '/user/recipe/branch/version',
      });
      res = httpMocks.createResponse()
    });

    it('should be a function', function() {
      expect(deleteVersion).to.be.a('function');
    });
    it('should delete the correct version', function() {

    });
    it('should delete a version only if no branches or forks depend on it', function() {

    });
    it('should be unavailable to user, even if not actually deleted', function() {

    });
    it('should respond with success if deletion successful', function() {

    });
    it('should respond with error if deletion unsuccessful', function() {

    });
  });
});
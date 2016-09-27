var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var ctrl = require('../../../server/controllers/versionsController.js');
var createVersion = ctrl.createVersion;
var getVersion = ctrl.getVersion;
var deleteVersion = ctrl.getVersion;

describe('versionsController.js', function() {
  describe('createVersion()', function() {
    it('should be a function', function() {
      expect(createVersion).to.be.a('function');
    });
    //should respond with success if creation successful
    //should respond with error if creation unsuccessful
  });

  describe('getVersion()', function() {
    it('should be a function', function() {
      expect(getVersion).to.be.a('function');
    });
    //should respond with error if get unsuccessful
  });

  describe('deleteVersion()', function() {
    it('should be a function', function() {
      expect(deleteVersion).to.be.a('function');
    });
    //should delete a version if no branches or forks below
    //should not return a version if branches or forks below
    //should respond with success if deletion successful
    //should respond with error if deletion unsuccessful
  });
});
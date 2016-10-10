var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var ctrl = require('../../../server/controllers/branchesController.js');
var createBranch = ctrl.createBranch;
var getBranch = ctrl.getBranch;
var deleteBranch = ctrl.deleteBranch;
var req, res;

describe('branchesController.js', function() {
  describe('createBranch()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'POST',
        URL: '/justin/:recipe/:branch',
        body: {
          version: {
            
          }
        }
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(createBranch).to.be.a('function');
    });
    it('should return 201 when successful', function() {

    });
    it('should return 500 when unsuccessful', function() {

    });
  });

  describe('getBranch()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'GET',
        URL: '/:username/:recipe/:branch',
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(getBranch).to.be.a('function');
    });
    it('should return 200 when successful', function() {

    });
    it('should return 404 when unsuccessful', function() {

    });
  });

  describe('deleteBranch()', function() {
    it('should be a function', function() {
      expect(deleteBranch).to.be.a('function');
    });
  });
});
var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');

var ctrl = require('../../../server/controllers/recipesController.js');
var createRecipe = ctrl.createRecipe;
var deleteRecipe = ctrl.deleteRecipe;
var req, res;

describe('recipesController.js', function() {
  describe('createRecipe()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'POST',
        url: 'username/recipe/create'
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(createRecipe).to.be.a('function');
    });
  });

  describe('deleteRecipe()', function() {
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'DELETE',
        url: 
      });
      res = httpMocks.createResponse();
    });

    it('should be a function', function() {
      expect(createRecipe).to.be.a('function');
    });
  });
});
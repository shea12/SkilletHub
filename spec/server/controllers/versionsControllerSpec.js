var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var generateId = mongoose.Types.ObjectId;
var ctrl = require('../../../server/controllers/versionsController.js');
var createVersion = ctrl.createVersion;
var getVersion = ctrl.getVersion;
var deleteVersion = ctrl.getVersion;
var getAllVersions = ctrl.getAllVersions;
var req, res;
var db = require(`${__dirname}/../../../server/schemas.js`);
var Recipe = db.Recipe;
var UserRecipe = db.UserRecipe;
var Promise = require('bluebird');


describe('versionsController.js', function() {
  //connect to testing db, disconnect afterwards
  before(function() {
    mongoose.connect('mongodb://localhost/mochaTesting');
  });
  after(function() {
    return Recipe.remove({})
    .then(function() {
      mongoose.connection.close();
    });
  });

  // describe('createVersion()', function() {
  //   beforeEach(function() {
  //     req = httpMocks.createRequest({
  //       method: 'POST',
  //       url: '/user/recipe/branch/version',
  //       body: {

  //       }
  //     });
  //     res = httpMocks.createResponse();
  //   });

  //   it('should be a function', function() {
  //     expect(createVersion).to.be.a('function');
  //   });
  // });

  // describe('getVersion()', function() {
  //   beforeEach(function() {
  //     req = httpMocks.createRequest({
  //       method: 'GET',
  //       url: '/user/recipe/branch/version',
  //     });
  //     res = httpMocks.createResponse();
  //   });

  //   it('should be a function', function() {
  //     expect(getVersion).to.be.a('function');
  //   });
  // });

  // describe('deleteVersion()', function() {
  //   beforeEach(function() {
  //     req = httpMocks.createRequest({
  //       method: 'DELETE',
  //       url: '/user/recipe/branch/version',
  //     });
  //     res = httpMocks.createResponse();
  //   });

  //   it('should be a function', function() {
  //     expect(deleteVersion).to.be.a('function');
  //   });
  // });

  describe('getAllVersions()', function() {

    let recipeId = generateId();
    beforeEach(function() {
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/justin/' + recipeId + '/master',
        params: {
          username: 'justin',
          recipe: recipeId,
          branch: 'master'
        }
      });
      res = httpMocks.createResponse()
      //clear db
      return UserRecipe.remove({})
      .then(function() {
        return Recipe.remove({});
      });
    });

    it('should be a function', function() {
      expect(getAllVersions).to.be.a('function');
    });

    it('should work', function() {
      var version1 = {
        _id: recipeId,
        rootVersion: null,
        previousVersion: null,
        branch: 'master',
        username: 'justin',
        name: {
          changed: true,
          value: true
        }
      };
      var version2 = {
        _id: generateId(),
        rootVersion: version1._id,
        previousVersion: version1._id,
        branch: 'master',
        username: 'justin',
        description: {
          changed: true,
          value: 'ashearg'
        }
      };
      var version3 = {
        _id: generateId(),
        rootVersion: version1._id,
        previousVersion: version2._id,
        branch: 'master',
        username: 'justin',
        servings: {
          changed: true,
          value: '2-4'
        }
      };
      var userrecipe = {
        username: 'justin',
        recipes: [{
          name: 'dog',
          rootRecipeId: version1._id,
          branches: [{
            name: 'master',
            mostRecentVersionId: version3._id,
          }]
        }]
      };

      return new UserRecipe(userrecipe).save()
      .then(function() {
        return new Recipe(version1).save();
      }).then(function() {
        return new Recipe(version2).save();
      }).then(function() {
        return new Recipe(version3).save();
      }).then(function() {
        return getAllVersions(req, res);
      }).then(function() {
        var data = res._getData();
        expect(data.length).to.equal(3);
      });

    });

  });
});
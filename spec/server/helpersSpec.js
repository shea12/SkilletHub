var expect = require('chai').expect;
var helpers = require('../../server/helpers.js');
var mongoose = require('mongoose')
var _ = require('underscore');
var Promise = require('bluebird');

var generateId = mongoose.Types.ObjectId;
var makeVersion = helpers.makeVersion;
var retrieveVersion = helpers.retrieveVersion;
var addUserRecipesCollection = helpers.addUserRecipesCollection;

var db = require(`${__dirname}/../../server/schemas.js`);
var Recipe = db.Recipe;
var UserRecipe = db.UserRecipe;

describe('helpers.js', function() {

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

  describe('makeVersion()', function() {
    var prev, changes;
    var username = 'jose';
    beforeEach(function() {
      prev = {
        rootVersion: null,
        _id: generateId(),
        username: username
      };
      changes = {
        username: 'phillipe',
        name: {
          changed: true,
          value: 'hey',
        }
      };

      return Recipe.remove({});
    });

    it('should be a function', function() {
      expect(makeVersion).to.be.a('function');
    });
    it('should return an object', function() {
      return makeVersion(prev, changes, username)
      .then(function(result) {
        expect(result).to.be.a('object');
      });
    });
    it('should initialize a new recipe', function() {
      return makeVersion('new', changes, username)
      .then(function(result) {
        expect(result.rootVersion).to.be.null;
        expect(result.previousVersion).to.be.null;
        expect(result.branch).to.equal('master');
      });
    });
    it('should save to the correct user', function() {
      var username = changes.username;
      var newUsername = 'marcell';
      var newChanges = _.clone(changes);
      newChanges.username = newUsername;

      var tests = [makeVersion(prev, newChanges, newUsername), makeVersion(prev, changes, username)]
      Promise.all(tests)
      .spread(function(result1, result2) {
        expect(result1.username).to.equal(newUsername);
        expect(result2.username).to.equal(username);
      });
    });
    // it('should save to the correct branch', function() {
    //   //implement when branches are implemented
    // });
    it('should have a reference to the root version', function() {
      var rootId = prev._id;
      return makeVersion(prev, changes, username)
      .then(function(result) {
        expect(result.rootVersion.equals(rootId)).to.be.true;
      });
    });
    it('should have a reference to the previous version', function() {
      var rootId = prev._id;
      return makeVersion(prev, changes, username)
      .then(function(result) {
        expect(result.previousVersion.equals(rootId)).to.be.true;
      });
    });
  });

  describe('retrieveVersion()', function() {
    var insertVersions = function(versions) {
      var insertions = versions.map(function(version) {
        return new Recipe(version).save();
      });
      return Promise.all(insertions);
    };
    var rootVersion, version2, version3;
    beforeEach(function() {
      return Recipe.remove({})
      .then(function() {
        rootVersion = {
          _id: generateId(),
          rootVersion: null,
          previousVersion: null,
          deleted: false,
          branch: 'master',
          username: 'justin',
          name: {
            changed: true,
            value: 'someRecipe'
          }
        };
        version2 = {
          _id: generateId(),
          rootVersion: rootVersion._id,
          previousVersion: rootVersion._id,
          deleted: false,
          branch: 'master',
          username: 'justin'
        };
        version3 = {
          _id: generateId(),
          rootVersion: rootVersion._id,
          previousVersion: version2._id,
          deleted: false,
          branch: 'master',
          username: 'justin'
        };
        return new UserRecipe({
          username: 'justin',
          recipes: [{
            name: 'someRecipe',
            rootRecipeId: rootVersion._id,
            branches: [{
              name: 'master',
              mostRecentVersionId: version3._id
            }]
          }]
        }).save();
      });
    });

    it('should be a function', function() {
      expect(retrieveVersion).to.be.a('function');
    });
    it('should return the correct recipe', function() {
      return insertVersions([rootVersion,version2,version3])
      .then(function() {
        return retrieveVersion(version3._id);
      })
      .then(function(result) {
        expect(result._id).to.not.be.undefined;
        expect(result.rootVersion.equals(rootVersion._id)).to.be.true;
        expect(result.previousVersion.equals(version2._id)).to.be.true;
        expect(result.branch).to.equal('master');
      });
    });
    it('should handle changes and additions to recipe', function() {
      rootVersion.name = {
        changed: true,
        value: 'justin'
      };
      rootVersion.ingredients = [{
        changed: true,
        name: 'carrot',
        position: 1
      }];
      version2.description = {
        changed: true,
        value: 'this is a salad'
      };
      version2.ingredients = [{
        changed: true,
        name: 'cucumber',
        position: 2
      }];
      version3.name = {
        changed: true,
        value: 'trump'
      };
      version3.ingredients = [{
        changed: true,
        name: 'dog',
        position: 1
      }];
      return insertVersions([rootVersion,version2,version3])
      .then(function() {
        return retrieveVersion(version3._id);
      })
      .then(function(result) {
        expect(result.name.changed).to.be.true;
        expect(result.name.value).to.equal('trump');
        expect(result.description.changed).to.be.true;
        expect(result.description.value).to.equal('this is a salad');
        expect(result.ingredients[0].changed).to.be.true;
        expect(result.ingredients[0].name).to.equal('dog');
        expect(result.ingredients[0].position).to.equal(1);
        expect(result.ingredients[1].changed).to.be.true;
        expect(result.ingredients[1].name).to.equal('cucumber');
        expect(result.ingredients[1].position).to.equal(2);
      });
    });
    it('should handle property removal from recipe', function() {
      rootVersion.name = {
        changed: true,
        value: 'justin'
      };
      rootVersion.ingredients = [{
        changed: true,
        name: 'cats',
        position: 1
      }];
      version2.description = {
        changed: true,
        value: 'this is a salad'
      };
      version2.ingredients = [{
        changed: true,
        name: 'dogs',
        position: 2
      }];
      version3.name = {
        changed: false
      };
      version3.ingredients = [
        {
          changed: true,
          name: 'dogs',
          position: 1
        }, {
          changed: false
      }];
      return insertVersions([rootVersion,version2,version3])
      .then(function() {
        return retrieveVersion(version3._id);
      })
      .then(function(result) {
        expect(result.description.changed).to.be.true;
        expect(result.description.value).to.equal('this is a salad');
        expect(result.ingredients[0].changed).to.be.true;
        expect(result.ingredients[0].name).to.equal('dogs');
        expect(result.ingredients[0].position).to.equal(1);
      });
    });
  });

  describe('addUserRecipesCollection()', function() {
    var exampleRecipe, username;
    beforeEach(function() {
      username = 'don miguel';
      exampleRecipe = {
        _id: generateId(),
        name: {
          changed: true,
          value: 'potato salad'
        }
      };
      return UserRecipe.remove({});
    });
    after(function() {
      return UserRecipe.remove({});
    });

    it('should be a function', function() {
      expect(addUserRecipesCollection).to.be.a('function');
    });
    it('should return an object', function() {
      return addUserRecipesCollection(username, exampleRecipe)
      .then(function(result) {
        expect(result).to.be.a('object');
      });
    });
    it('should be assigned to the correct user', function() {
      return addUserRecipesCollection(username, exampleRecipe)
      .then(function() {
        return UserRecipe.findOne({
          username: username
        });
      }).then(function(result) {
        expect(result.username).to.equal(username);
      });
    });
    it('should add the master recipe', function() {
      return addUserRecipesCollection(username, exampleRecipe)
      .then(function() {
        return UserRecipe.findOne({
          username: username
        });
      }).then(function(result) {
        expect(result.recipes[0].branches[0].name).to.equal('master');
        expect(result.recipes[0].branches[0].mostRecentVersionId.equals(exampleRecipe._id)).to.be.true;
      });
    });
    it('should have the correct recipe name', function() {
      return addUserRecipesCollection(username, exampleRecipe)
      .then(function() {
        return UserRecipe.findOne({
          username: username
        });
      }).then(function(result) {
        expect(result.recipes[0].name).to.equal('potato salad');
      });
    });
  });
});
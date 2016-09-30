var expect = require('chai').expect;
var helpers = require('../../server/helpers.js');
var mongoose = require('mongoose')
var _ = require('underscore');
var Promise = require('bluebird');

var generateId = mongoose.Types.ObjectId;
var makeVersion = helpers.makeVersion;
var retrieveVersion = helpers.retrieveVersion;
var deleteDownstream = helpers.deleteDownstream;

var db = require(`${__dirname}/../../server/schemas.js`);
var Recipe = db.Recipe;

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
    beforeEach(function() {
      var userId = generateId();
      prev = {
        rootVersion: null,
        _id: generateId(),
        userId: userId
      };
      changes = {
        userId: userId,
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
      return makeVersion(prev, changes)
      .then(function(result) {
        expect(result).to.be.a('object');
      });
    });
    it('should initialize a new recipe', function() {
      return makeVersion('new', changes)
      .then(function(result) {
        expect(result.rootVersion).to.be.null;
        expect(result.previousVersion).to.be.null;
        expect(result.deleted).to.be.false;
        expect(result.branch).to.equal('master');
      });
    });
    it('should save to the correct user', function() {
      var userId = changes.userId;
      var newUserId = generateId();
      var newChanges = _.clone(changes);
      newChanges.userId = newUserId;

      var tests = [makeVersion(prev, newChanges), makeVersion(prev, changes)]
      Promise.all(tests)
      .spread(function(result1, result2) {
        expect(result1.userId.equals(newUserId)).to.be.true;
        expect(result2.userId.equals(userId)).to.be.true;
      });
    });
    // it('should save to the correct branch', function() {
    //   //implement when branches are implemented
    // });
    it('should have a reference to the root version', function() {
      var rootId = prev._id;
      return makeVersion(prev, changes)
      .then(function(result) {
        expect(result.rootVersion.equals(rootId)).to.be.true;
      });
    });
    it('should have a reference to the previous version', function() {
      var rootId = prev._id;
      return makeVersion(prev, changes)
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
          branch: 'master'
        };
        version2 = {
          _id: generateId(),
          rootVersion: rootVersion._id,
          previousVersion: rootVersion._id,
          deleted: false,
          branch: 'master'
        };
        version3 = {
          _id: generateId(),
          rootVersion: rootVersion._id,
          previousVersion: version2._id,
          deleted: false,
          branch: 'master'
        };
      });
    });

    it('should be a function', function() {
      expect(retrieveVersion).to.be.a('function');
    });
    it('should return a object', function() {
      return insertVersions([rootVersion,version2,version3])
      .then(function() {
        expect(retrieveVersion(version3)).to.be.a('object');
      });
    }); 
    it('should return the correct recipe', function() {
      return insertVersions([rootVersion,version2,version3])
      .then(function() {
        return retrieveVersion(version3);
      })
      .then(function(result) {
        expect(result._id).to.not.be.undefined;
        expect(result.rootVersion.equals(rootVersion._id)).to.be.true;
        expect(result.previousVersion.equals(version2._id)).to.be.true;
        expect(result.deleted).to.be.false;
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
        return retrieveVersion(version3);
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
        return retrieveVersion(version3);
      })
      .then(function(result) {
        expect(result.name.changed).to.be.undefined;
        expect(result.name.value).to.be.undefined;
        expect(result.description.changed).to.be.true;
        expect(result.description.value).to.equal('this is a salad');
        expect(result.ingredients[0].changed).to.be.true;
        expect(result.ingredients[0].name).to.equal('dogs');
        expect(result.ingredients[0].position).to.equal(1);
      });
    });
  });

  describe('deleteDownstream()', function() {
    it('should be a function', function() {
      expect(deleteDownstream).to.be.a('function');
    });

  });

});
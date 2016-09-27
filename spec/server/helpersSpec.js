var expect = require('chai').expect;
var helpers = require('../../server/helpers.js');
var makeVersion = helpers.makeVersion;
var retrieveVersion = helpers.retrieveVersion;
var deleteDownstream = helpers.deleteDownstream;

describe('helpers.js', function() {
  describe('makeVersion()', function() {
    var prev = {};
    var changes = {
      name: {                                   
        changed: true,
        value: 'awesome recipe'
      },                   
      description: {                            
        changed: true,
        value: 'cool recipe'
      },         
      ingredients: [{
        changed: true,
        name: String,          
        type: String,                
        position: Number,           
        amount: Number,               
        unit: String,                
        prep: String,                 
        substitutes: [String]        
        optional: true             
      }],
      steps: [{
        changed: true,
        position: Number,             
        description: String,          
        time: Number,                
        ingredients: [String],  
      }]
    };

    it('should be a function', function() {
      expect(makeVersion).to.be.a('function');
    });
    it('should return a promise', function() {
      var result = makeVersion(prev, changes);
      expect(result).to.be.a('promise');
    });

    it('should return an empty promise if successful', function() {
      makeVersion(prev, changes)
      .then(function(result) {
        expect(result).to.be.equal('');
      });
    });

    it('should return a promise containing an error if unsuccessful', function() {
      var changes = 'not what it is expecting';
      makeVersion(prev, changes)
      .then(function(result) {
        expect(result).to.not.be.equal('');
      });
    });

    it('should save to the correct user', function() {

    });
    it('should save to the correct branch', function() {

    });
    it('should omit fields that are not modified', function() {

    });
    it('should have a reference to the root version', function() {

    });
    it('should have a reference to the previous version', function() {

    });
    it('should maintain ingredient order', function() {

    });
    it('should maintain step order', function() {

    });
  });

  describe('retrieveVersion()', function() {
    it('should be a function', function() {
      expect(retrieveVersion).to.be.a('function');
    });

  });

  describe('deleteDownstream()', function() {
    it('should be a function', function() {
      expect(deleteDownstream).to.be.a('function');
    });

  });

});

rootVersion
previousVersion
deleted
branch
userId
stars

{
  rootVersion: Schema.Types.ObjectId,   
  previousVersion: Schema.Types.ObjectId,  
  deleted: false,                         
  branch: {                                 
    changed: true,
    value: 'master'
  },                 
  userID: {                                 
    changed: true,
    value: Schema.Types.ObjectId  
  },  
  name: {                                   
    changed: true,
    value: 'awesome recipe'
  },                   
  description: {                            
    changed: true,
    value: 'cool recipe'
  },            
  servings: {         
    changed: true,
    value: 2
  }, 
  cookTime: {                   
    changed: true,
    value: 30,                          
  },             
  skillLevel: {                    
    changed: true,
    value: 'easy'
  },            
  picture: {                        
    changed: true,
    value: 'www.imagewashere.com/img.png'
  },                
  dependencies: [{              
    changed: true,
    position: 1,
    dependencyId: Schema.Types.ObjectId
  }],
  ingredients: [{
    changed: true,
    name: String,          
    type: String,                
    position: Number,           
    amount: Number,               
    unit: String,                
    prep: String,                 
    substitutes: [String]        
    optional: true             
  }],
  steps: [{
    changed: true,
    position: Number,             
    description: String,          
    time: Number,                
    ingredients: [String],  
  }],
  tags: [{
    changed: true,
    position: Number,
    tagId: Schema.Types.ObjectId
  }],
  issues: [{
    changed: true,
    position: Number,
    issueId: Schema.Types.ObjectId
  }],
  stars: Number,
};
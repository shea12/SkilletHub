let helpers = require(`${__dirname}/../helpers.js`);
let db = require(`${__dirname}/../schemas.js`);
let UserRecipe = db.UserRecipe;
let Recipe = db.Recipe;
let Issue = db.Issue;
let Comment = db.Comment;
let _ = require('underscore');
let Promise = require('bluebird')

module.exports = {
  // description: Creates an issue
  // body: {
  //   username: person who created the issue
  //   type: ingredient / step ,
  //   position: position of ingredient or step,
  //   data: comment text
  // }
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  createIssue: (req, res) => {
    return new Issue({
      owner: req.params.username,
      rootVersion: req.params.recipe,
      issueCreator: req.body.username,
      type: req.body.type,
      position: req.body.position,
      status: 'open'
    }).save().then(issue => {
      return new Comment({
        username: req.body.username,
        issue: issue._id,
        position: 1,
        data: req.body.data,
      }).save();
    }).then(() => {
      res.status(201).send();
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(500).send(error);
    });
  },

  // description: Updates the status of an issue
  // body: {
  //   status: "closed" or "resolved"
  // }
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  updateStatus: (req, res) => {

  },

  // description: Gets all issues for a recipe
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  getIssues: (req, res) => {
    let results;
    return Issue.find({
      owner: req.params.username,
      rootVersion: req.params.recipe
    }).then(issues => {
      results = issues;
      let comments = issues.map(issue => {
        return Comment.find({
          issue: issue._id
        }).sort({
          position: 'asc'
        });
      });

      return Promise.all(comments);
    }).spread((...comments) => {
      comments.forEach(commentGroup => {
        _.find(results, result => {
          return result._id === commentGroup[0].issue;
        }).comments = commentGroup;
      });

      console.log('results: ', results);
      res.status(200).send(results);
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(404).send(error);
    })
  },

  // description: Adds a comment to an issue
  // body: {
  //   data: comment text
  // }
  // params: {
  //   username: username of person who made comment,
  //   issue: id of the issue the comment belongs to
  // }
  createComment: (req, res) => {
    return Issue.findOne({
      _id: req.params.issue
    }).then(issue => {
      return new Comment({
        username: req.params.username,
        issue: req.params.issue,
        position: issue.position + 1,
        data: req.body.data,
      }).save();
    }).then(() => {
      res.status(201).send();
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(500).send();
    });
  }
};
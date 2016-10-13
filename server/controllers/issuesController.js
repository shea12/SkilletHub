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
  //   title: title text,
  //   data: comment text
  // }
  // params: {
  //   username: owner of the recipe,
  //   recipe: root recipe id
  // }
  createIssue: (req, res) => {
    let notification = Recipe.findOne({
      username: req.params.username,
      _id: req.params.recipe
    }).then(recipe => {
      return helpers.createNotification({
        notificationOwner: req.params.username,
        username: req.body.username,
        recipeId: req.params.recipe,
        text: `${req.body.username} created a new issue ${req.body.title} for your recipe ${recipe.name.value}.`
      });
    });

    let issue = new Issue({
      owner: req.params.username,
      rootVersion: req.params.recipe,
      issueCreator: req.body.username,
      title: req.body.title,
      type: req.body.type,
      position: req.body.position,
      status: 'open',
      numOfComments: 1
    }).save().then(issue => {
      return new Comment({
        username: req.body.username,
        issue: issue._id,
        commentNumber: 1,
        data: req.body.data,
      }).save();
    });

    Promise.all([notification, issue])
    .spread((notification, issue) => {
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
    let issue = Issue.findOne({
      owner: req.params.username,
      rootVersion: req.params.recipe
    }).then(issue => {
      return helpers.createNotification({
        notificationOwner: issue.issueCreator,
        username: req.params.username,
        recipeId: req.params.recipe,
        text: `${req.params.username} ${req.body.status} your issue ${issue.title}.`
      });
    });

    let update = Issue.update({
      owner: req.params.username,
      rootVersion: req.params.recipe
    }, {
      status: req.body.status
    });

    Promise.all([issue, update])
    .spread((issue, update) => {
      res.status(200).send();
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(500).send();
    });
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
      results = results.map(result => {
        return result.toObject();
      });

      let comments = issues.map(issue => {
        return Comment.find({
          issue: issue._id
        }).sort({
          commentNumber: 'asc'
        });
      });

      return Promise.all(comments);
    }).spread((...comments) => {
      comments.forEach(commentGroup => {
        let index = _.findIndex(results, result => {
          return result._id.equals(commentGroup[0].issue);
        });
        results[index].comments = commentGroup;
      });

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
      let addComment = new Comment({
        username: req.params.username,
        issue: req.params.issue,
        commentNumber: issue.numOfComments + 1,
        data: req.body.data,
      }).save();

      let updateCommentCount = Issue.update({
        _id: req.params.issue
      }, {
        numOfComments: issue.numOfComments + 1
      });

      return Promise.all([addComment, updateCommentCount]);
    }).spread(() => {
      res.status(201).send();
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(500).send();
    });
  }
};
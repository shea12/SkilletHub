var bodyParser = require('body-parser');
var path = require('path'); 
let db = require(`${__dirname}/schemas.js`);
let User = db.User;

module.exports = function(app, express) {
  console.log('getting request!'); 
  app.use(express.static(path.join(__dirname, '../client/deploy')));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // On every request, we verify that the user is logged in
  //  by checking their token
  var authenticateUser = function(req, res, next) {
    console.log('authenticateUser middleware running');
    if (!req.body.username) {
      console.log('User could not be authenticated, username not in req.body');
      return res.status(500).send();
    } else {
      //search db Users db for username, retrieve token, if token is not null
      // then they are currently authenticated and logged in
      User.find({username: req.body.username}, token, function(error, response) {
        if (error) {
          console.log('Could not find username in db: ', error);
          res.status(400).send(error);
        } 
        if (response.token) {
          console.log('Found user, token active, user authenticated: ', response);
          res.status(200).send(response);
        } else {
          console.log('Found user, token inactive, user not authenticated ', response);
          res.status(400).send(response);
        }
      });
    }
  };


  app.use('/:username', authenticateUser, function(req, res) {
    res.status(200).send();
  });
};


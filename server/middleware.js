var bodyParser = require('body-parser');
var path = require('path'); 
let db = require(`${__dirname}/schemas.js`);
let User = db.User;

module.exports = function(app, express) {
  console.log('getting request!'); 
  app.use(express.static(path.join(__dirname, '../client/deploy')));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());



    /*
    Friday at 3:11pm, not currently using this middleware for authentication on each request.
    Checking that users are logged in is being handled by the 'handleNavigation' function in App.jsx.
    

    var authenticateUser = function(req, res, next) {
      // On every request, we verify that the user is logged in
      //  by checking their token
      console.log('authenticateUser middleware running');
      if (req.params.username) {
        //search db Users db for username, retrieve token, if token is not null
        // then they are currently authenticated and logged in
        User.find({username: req.body.username}, 'token', function(error, response) {
          if (error) {
            console.log('Could not find username in db: ', error);
            res.status(400).send(error);
          }
          if (!response.token) {
            console.log('Found user, token inactive, user not authenticated: ', response);
            res.status(400).send(response);
          } else {
            console.log('Found user, token active, user authenticated: ', response);
            res.status(200).send(response);
          }
        });
      } else {
        console.log('req.params.username is false: ', req.params);
        return res.status(500).send();
      }
    };

    app.use('/', authenticateUser, function(req, res) {
      res.status(200).send();
    });
  */
};


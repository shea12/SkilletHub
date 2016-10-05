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
  var verifyUserToken = function(req, res, next) {
    // req.body needs to include username


  };


  // app.use(verifyUserToken);
};


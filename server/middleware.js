var bodyParser = require('body-parser');
var path = require('path'); 

module.exports = function(app, express) {
  console.log('getting request!'); 
  app.use(express.static(path.join(__dirname, '../client/deploy')));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};

// module.exports = function(app, express) {
//   console.log('authenticating user session');
  
// }
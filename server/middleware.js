var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(express.static('../client/deploy'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};

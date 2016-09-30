let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testingSkilletHub');

let port = process.env.PORT || 3000;

require('./middleware.js')(app, express);
require('./routes.js')(app, express);

app.listen(port, function() {
  console.log('Now running on port: ', port);
});
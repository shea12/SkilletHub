let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, function() {
  console.log('Now running on port: ', port);
});
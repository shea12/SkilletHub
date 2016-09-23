let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Now running on port: ', port);
});
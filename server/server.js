let express = require('express');
let app = express();
let mongoose = require('mongoose');
let key = require(`${__dirname}/dbkey.js`);
console.log(key);
mongoose.connect(key);
let port = process.env.PORT || 3000;
let tags = require(`${__dirname}/tags.js`);
let Tag = require(`${__dirname}/schemas.js`).Tag;

require('./middleware.js')(app, express);
require('./routes.js')(app, express);

app.listen(port, function() {
  console.log('Now running on port: ', port);

  Tag.find().then(results => {
    return results.length < 1 ? Tag.create(tags.tags) : 'existing';
  }).then(result => {
    if (result !== 'existing') {
      console.log('Tags inserted');
    }
  }).catch(error => {
    console.log(error);
  });
});
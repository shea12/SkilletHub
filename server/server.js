let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testingSkilletHub');
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
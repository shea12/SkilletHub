let express = require('express');
let app = express();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testingSkilletHub');

let port = process.env.PORT || 3000;

let Recipe = require(`${__dirname}/schemas.js`).Recipe;
// //add recipes
// new Recipe({
//   rootVersion: '57eb42e8f04bae1874978946',
//   previousVersion: '57eb4361cbaa581897c17d6e',
//   deleted: false,
//   branch: 'master',
//   stars: 0,
//   name: {
//     changed: false
//   }
// }).save().then(results => {
//   console.log(results);
// });

// Recipe.find().then(results => {
//   for (var i = 0; i < results.length; i++) {
//     console.log(results[i]);
//   }
// });

let helpers = require(`${__dirname}/helpers.js`);
let version = {
  previousVersion: '57eb4385b68dfd18ad27ba64',
  branch: 'master'
};
helpers.retrieveVersion(version)
.then(result => {
  console.log('RETURNED: ', result);
});

require('./middleware.js')(app, express);
require('./routes.js')(app, express);

app.listen(port, function() {
  console.log('Now running on port: ', port);
});
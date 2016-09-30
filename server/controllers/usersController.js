var request = require('request');

exports.signup = function(req, res) {
  console.log('req.body in signup controller: ', req.body);
  var options = {
    'method': 'post',
    'url': 'http://localhost:8080/user/signup',
    'json': true,
    'Content-Type': 'application/x-www-form-urlencoded',
    'body': req.body
  };
  request(options, function(error, res, body) {
  	if (error) {
      console.log('error in SH user/signup: ', error);
  	}
    console.log('response from SH-Users in SH/usersController: ', res.body);
    //do something with response
    // res.send(200);
  }); 
};

exports.login = function(req, res) {
  console.log('req.body in signup controller: ', req.body);
  var options = {
    'method': 'post',
    'url': 'http://localhost:8080/user/signup',
    'json': true,
    'Content-Type': 'application/x-www-form-urlencoded',
    'body': req.body
  };
  request(options, function(error, res, body) {
  	if (error) {
      console.log('error in SH user/login: ', error);
  	}
    console.log('response from SH-Users: ', res.body);
    //do something with response
    // res.send(200);
  }); 
};

exports.logout = function(req, res) {
  console.log('req.body in signup controller: ', req.body);
  var options = {
    'method': 'get',
    'url': 'http://localhost:8080/user/signup',
    'json': true,
    'Content-Type': 'application/x-www-form-urlencoded',
    'body': req.body
  };
  request(options, function(error, res, body) {
  	if (error) {
      console.log('error in SH user/logout: ', error);
  	}
    console.log('response from SH-Users: ', res.body);
    //do something with response
    // res.send(200);
  }); 
};
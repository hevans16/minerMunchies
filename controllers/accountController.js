var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userModel = require('./../models/user.js');
var userProfile = require('./../utilities/userProfile.js');
var userDB = require('./../utilities/userDB.js');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

//Route for the login page, needs {user: req.query} parameter for form
router.get('/login', function (req, res) {
  res.render('login', {user: req.query});
});

//Route for the register page, needs {user: req.query} parameter for form
router.get('/register', function (req, res) {
  res.render('register', {user: req.query});
});

//Route for the favorites page
router.get('/favorites', function (req, res) {
  res.render('favorites');
});

//Route for the account page, cannot be accessed until the user has logged in
router.get('/account', function (req, res) {
  if(req.session.user){
    res.render('account');
  }
  else{
    res.render('login', {user: req.query});
  }
});

/*Post route for the login form. If the username does not match any usernames
in the userDB, then the user will be redirected to the register page. If it does
match one of the usernames, they will be logged in and the user information is
saved to the session. Redirects to the account page after sign in.*/
router.post('/login', urlencodedParser, function(req, res){
  var userModel = require('./../models/user.js');
  var userProfile = require('./../utilities/userProfile.js');
  var userDB = require('./../utilities/userDB.js')
  console.log(req.body);
  userDB = userDB.getUser(req.body.username);
  console.log(userDB);
  if(userDB.username == null){
    res.redirect('register');
  }
  else{
    req.session.user = userDB;
    req.session.save();
    res.redirect('account');
  }
});

/*Post route for the register form. A new user object is created using user
input and added to the userDB. Their account is now created. They will be
logged in and the user information is saved to the session. Redirects to the
account page after sign in.*/
router.post('/register', urlencodedParser, function(req, res){
  var userModel = require('./../models/user.js');
  var userProfile = require('./../utilities/userProfile.js');
  var userDB = require('./../utilities/userDB.js')
  userModel = new userModel.User(req.body.username, req.body.firstName, req.body.lastName, req.body.email, req.body.password);
  userDB.addUser(userModel);
  req.session.user = userModel;
  req.session.save();
  console.log(req.session.user);
  req.session.favorites = userProfile.getFavorites();
  res.redirect('account');
});

/*Post route for the profile's logOut button. Simply deletes the user data
from the session and redirects to the home page.*/
router.post('/logout', urlencodedParser, function(req, res){
  delete req.session['user'];
  res.redirect('/');
});

module.exports = router;

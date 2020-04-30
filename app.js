var express = require('express');
var app = express();
var session = require('express-session');

//Creates a session that will store information as long as the app is running
app.use(session({secret: 'milestone', resave: false, saveUninitialized: false}));

var userModel = require('./models/user.js');
var userProfile = require('./utilities/userProfile.js');
var userDB = require('./utilities/userDB.js')
var reviewModel = require('./models/review.js');
var reviewDB = require('./utilities/reviewDB.js');


//Ensures that the session objects are available to the views
//(not sure if this actually does anything at this point)
app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.session.user = req.session.user;
  res.locals.originalUrl = req.originalUrl;
  res.locals.session.reviews = req.session.reviews;
  res.locals.session.favorites = req.session.favorites;
  next();
});

//Tells the program that the views are ejs
app.set('view engine', 'ejs');
//Ensures that the assets (scripts, stylsheets, images) are accessible to views
app.use('/assets', express.static('assets'));

//requires both of the controllers
var general = require('./controllers/generalController.js');
var account = require('./controllers/accountController.js');

//Tells the program which controller to use for which pages.
app.use('/', general);
app.use('/restaurants', general);
app.use('/vending', general);
app.use('/menu', general);
app.use('/map', general);
app.use('/', account);
app.use('/account', account);
app.use('/login', account);
app.use('/register', account);
app.use('/favorites', account);

//creates server
app.listen(8000, function(){
  console.log('App now listening on port 8000');
});

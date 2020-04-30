var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var reviewModel = require('./../models/review.js');
var reviewDB = require('./../utilities/reviewDB.js');
var userModel = require('./../models/user.js');
var userProfile = require('./../utilities/userProfile.js');
var userDB = require('./../utilities/userDB.js');
var restaurantModel = require('./../models/restaurant.js');
var restaurantDB = require('./../utilities/restaurantDB.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false});

//Route for the home page
router.get('/', function (req, res) {
    res.render('index');
});

//Route for the restaurants page
router.get('/restaurants', function (req, res) {
  var restaurantDB = require('./../utilities/restaurantDB.js');
  req.session.restaurants = restaurantDB.getRestaurants();
  res.render('catalog');
});

//Route for the vending page
router.get('/vending', function (req, res) {
  res.render('vending');
});

//Route for the map page
router.get('/map', function (req, res) {
  res.render('map');
});

//Route for the menu page
router.get('/menu', function (req, res) {
  res.render('menu');
});

//Route for the review page. Redirects to login page if the uses has not logged in
router.get('/review', function (req, res) {
  if(req.session.user){
    res.render('review', {review: req.query});
  }
  else{
    res.redirect('login');
  }
});

//Route for the review page. Redirects to login page if the uses has not logged in
router.get('/reviews', function (req, res) {
  var reviewDB = require('./../utilities/reviewDB.js');
  reviewDB = reviewDB.getReviews();
  req.session.reviews = reviewDB;
  res.render('reviews');
});

//Post route for the menu button. Retrieves the restaurant from the restaurantDB and stores it in the session
router.post('/menuButton', urlencodedParser, function (req, res) {
  var restaurantDB = require('./../utilities/restaurantDB.js');
  restaurantDB = restaurantDB.getRestaurant(req.body.name);
  req.session.restaurant = restaurantDB;
  console.log(req.session.restaurant);
  res.redirect('menu');
});

//Post route for the review form. Creates a new review object using user input and adds it to the reviewDB.
//Then gets all reviews, calculates the average wait, amount spent, and rating, and redirects to reviews page
router.post('/review', urlencodedParser, function(req, res){
  reviewModel = new reviewModel.Review(req.body.restaurant, req.body.username, req.body.exp, req.body.wait, req.body.order, req.body.spent, req.body.rating);
  reviewDB.addReview(reviewModel);
  req.session.reviews = reviewDB.getReviews();
  req.session.averages = reviewDB.getAverages(reviewModel.restaurant);
  req.session.save();
  console.log(req.session.reviews);
  res.redirect('/reviews');
});

/*Post route for the favorite button. Redirects if user tries to add a favorite
without logging in. Button sends restaurant name which is used to match the resturant
in the resturantDB, then added to the favorites database (userProfile). Favorites
are retrieved and the page redirects to the favorites to display them.
*/
router.post('/favoriteButton', urlencodedParser, function(req, res){
  var restaurantDB = require('./../utilities/restaurantDB.js');
  var userProfile = require('./../utilities/userProfile.js');
  if(req.session.user){
  restaurantDB = restaurantDB.getRestaurant(req.body.name);
  userProfile.addFavorite(restaurantDB);
  userProfile = userProfile.getFavorites();
  req.session.favorites = userProfile;
  req.session.save();
  console.log(req.session.favorites);
  res.redirect('/favorites');
  }
  else{
    res.redirect('login');
  }
});

//Post route for the add review button. Gets all of the reviews from the database and stores them in the session
router.post('/reviewButton', urlencodedParser, function(req, res){
  var restaurantDB = require('./../utilities/restaurantDB.js');
  var userProfile = require('./../utilities/userProfile.js');
  if(req.session.user){
  restaurantDB = restaurantDB.getRestaurant(req.body.name);
  req.session.restaurant = restaurantDB;
  req.session.save();
  console.log(req.session.restaurant);
  res.redirect('/review');
  }
  else{
    res.redirect('login');
  }
});

//When the reviews button is clicked, it sends the restaurant name which is used to find the reviews and calculate the average wait, amount spent, and rating
router.post('/reviewsButton', urlencodedParser, function(req, res){
  var restaurantDB = require('./../utilities/restaurantDB.js');
  restaurantDB = restaurantDB.getRestaurant(req.body.name);
  req.session.restaurant = restaurantDB;
  req.session.averages = reviewDB.getAverages(restaurantDB.name);
  console.log(req.session.averages);
  req.session.save();
  console.log(req.session.restaurant);
  res.redirect('/reviews');
});

//When the delete button is clicked, it sends the restaurant name which is used to delete it from the array of favorites
router.post('/delete', urlencodedParser, function(req, res){
  var restaurantDB = require('./../utilities/restaurantDB.js');
  var userProfile = require('./../utilities/userProfile.js');
  if(req.session.user){
  restaurantDB = restaurantDB.getRestaurant(req.body.name);
  userProfile.removeFavorite(restaurantDB);
  userProfile = userProfile.getFavorites();
  req.session.favorites = userProfile;
  req.session.save();
  res.redirect('/favorites');
  }
  else{
    res.redirect('login');
  }
});

module.exports = router;

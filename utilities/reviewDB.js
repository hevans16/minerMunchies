//Requires review.js so Review objects can be created
var reviewModel = require('./../models/review.js');
//Requires restaurantDB.js so the array of resturants can be accessed
var restaurantDB = require('./../utilities/restaurantDB.js');

//Creates an array that will be filled with review objects
var reviews = []
//retrieves the array of restaurants
restaurantDB = restaurantDB.getRestaurants();
//Creates a default review for every restaurant so each has one
for(let i = 0; i < restaurantDB.length; i++) {
    reviews.push(new reviewModel.Review(restaurantDB[i].name, 'BigRichard420', 'good', 5, 'food', 5, 8));
}

//Receives a Review object from the controller, adds it to the array of reviews
function addReview(r){
  reviews.push(new reviewModel.Review(r.restaurant, r.username, r.exp, r.wait, r.order, r.spent, r.rating));
  console.log('Added review from' + r.username);
}

//Returns the reviews array
function getReviews(){
  return reviews;
}

/*Creates an Averages object with fields wait, spent, rating. The purpose of
this object is to calculate the averages of the numerical values of the reviews
*/
class Averages{
  constructor(wait, spent, rating){
    this._wait = wait;
    this._spent = spent;
    this._rating = rating;
  }
  set wait(wait){
    this._wait = wait;
  }
  get spent(){
    return this._spent;
  }
  set spent(spent){
    this._spent = spent;
  }
  get rating(){
    return this._rating;
  }
  set rating(rating){
    this._rating = rating;
  }
}

/*Receives a restaurant name from the controller. Searches through the array
of reviews to find the restaurant name, adds the wait, spent, and rating values
to the avg variables when found, and increments the count. When loop exits,
divides the avg variables by the count to find the average for each field.
Creates and returns new Averages object with waitAvg, spentAvg, ratingAvg.*/
function getAverages(r){
  var averages = new Averages(null,null,null);
  var waitAvg = 0;
  var spentAvg = 0;
  var ratingAvg = 0;
  var count = 0;
  for(let i = 0; i < reviews.length; i++){
    if(r==reviews[i].restaurant){
      waitAvg+=reviews[i].wait;
      spentAvg+=reviews[i].spent;
      ratingAvg+=reviews[i].rating;
      count++;
    }
  }
      waitAvg = waitAvg/count;
      spentAvg = spentAvg/count;
      ratingAvg = ratingAvg/count;
      var averages = new Averages(waitAvg,spentAvg,ratingAvg);
      return averages;
}
//Exports Averages object and all functions to be used in other files
module.exports.addReview = addReview;
module.exports.getReviews = getReviews;
module.exports.Averages = Averages;
module.exports.getAverages = getAverages;

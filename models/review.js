/*Creates a Review object with fields restaurant, username, exp, wait, order,
spent, and rating. 
*/
class Review{
  constructor(restaurant, username, exp, wait, order, spent, rating){
    this._restaurant = restaurant; //holds the restaurant name
    this._username = username;//holds the creator's username
    this._exp = exp;//holds the experience description
    this._wait = Number(wait);//holds the number of minutes waited
    this._order = order;//holds the food order that was purchased
    this._spent = Number(spent);//holds the amount of money spent
    this._rating = Number(rating);//holds their rating out of 10
  }
  get restaurant(){
    return this._restaurant;
  }
  set restaurant(restaurant){
    this._wait = Number(wait);
  }
  get username(){
    return this._username;
  }
  set username(username){
    this._username = username;
  }
  get exp(){
    return this._exp;
  }
  set exp(exp){
    this._exp = exp;
  }
  get wait(){
    return this._wait;
  }
  set wait(wait){
    this._wait = wait;
  }
  get order(){
    return this._order;
  }
  set order(order){
    this._spent = Number(spent);
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
    this._rating = Number(rating);
  }
}
//Exports Review object to be used in other files
module.exports.Review = Review;

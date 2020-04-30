//Requires restaurant.js so Restaurant objects can be created
var restaurantModel = require('./../models/restaurant.js');

/*Creates an array for adding favorites.
Starts with one object set to null to avoid errors*/
var favorites = [new restaurantModel.Restaurant(null, null, null)];

//Don't think this is used rn but it might be eventually
var userProfile = function(username){
var userModel = {username:username};
return userModel;
};

/*Receives a Resturant object from the controller, adds it to the array of
favorites. If it is already in the favorites it is first removed and then added
again at the end of the array*/
function addFavorite(r){
  for(var x = 0; x < favorites.length; x++){
    if(r.name == favorites[x].name){
      favorites.splice(x,1);
      break;
    }
  }
  favorites.push(r);
  //Removes the initial null Restuarant object when a real one is added
  if(favorites[0].name==null){
    favorites.splice(0,1);
  }
}

/*Receives a Resturant object from the controller, searches the array of
favorites and removes the corresponding favorite if it matchesy*/
function removeFavorite(r){
  for(var x = 0; x < favorites.length; x++){
    if(r.name == favorites[x].name){
      //adds a null resturant object if the only favorite is about to removed
      if(favorites.length == 1){
        favorites.push(new restaurantModel.Restaurant(null, null, null));
      }
      favorites.splice(x,1);
      break;

    }
  }
}
//Returns the array of favorites
function getFavorites(){
  return favorites;
}
//Exports all functions to be used in other files
module.exports.userProfile = userProfile;
module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
module.exports.getFavorites = getFavorites;

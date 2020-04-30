//Requires restaurant.js so Restaurant objects can be created
var restaurantModel = require('./../models/restaurant.js');

//Creates an array of Restaurants objects with the names, menus, and logos of all our resturants
var restaurants = [
  new restaurantModel.Restaurant('Chick-fil-A', 'https://www.chick-fil-a.com/locations/nc/university-of-nc-charlotte', './../assets/images/logo_chickfila.png'),
  new restaurantModel.Restaurant('Bojangles', 'https://www.bojangles.com/menu/m/biscuits/', '/../assets/images/logo_bojangles.png'),
  new restaurantModel.Restaurant("Wendy's", 'https://order.wendys.com/categories?site=menu', './../assets/images/logo_wendys.png'),
  new restaurantModel.Restaurant('Bistro 49', 'https://new.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_bistro-49.png'),
  new restaurantModel.Restaurant("The Den by Denny's", 'https://new.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_den.png'),
  new restaurantModel.Restaurant("Forty-Niner Diner", 'https://new.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/FortyNinerDiner_logoWeb.png'),
  new restaurantModel.Restaurant("Salsarita's", 'https://salsaritas.com/menu/', '../../assets/images/logo_salsaritas.png'),
  new restaurantModel.Restaurant("Sambazon", 'sambazon.com/cafe-menu', './../assets/images/sambazon.jpg'),
  new restaurantModel.Restaurant("Panda Express", 'https://www.pandaexpress.com/menu', './../assets/images/logo_panda-express.png'),
  new restaurantModel.Restaurant("Smoked", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_smoked.png'),
  new restaurantModel.Restaurant("Starbucks", 'https://www.starbucks.com/menu', './../assets/images/logo_starbucks.png'),
  new restaurantModel.Restaurant("Fretwell Cafe", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_fretwell-cafe.png'),
  new restaurantModel.Restaurant("Library Cafe", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_library-cafe.png'),
  new restaurantModel.Restaurant("Einstein Bros. Bagels", 'https://www.einsteinbros.com/menu/', './../assets/images/einsteins.png'),
  new restaurantModel.Restaurant("Dominos", 'https://www.dominos.com/en/pages/order/menu#!/menu/category/viewall/', './../assets/images/dominos_logoWeb150px_0.png'),
  new restaurantModel.Restaurant("Mamma Leone's", 'https://www.dineoncampus.com/unccharlotte/whats-on-the-menu', './../assets/images/logo_mamma-leones.png'),
  new restaurantModel.Restaurant("Subway", 'https://www.subway.com/en-US/MenuNutrition/Menu', './../assets/images/SUBWAYLOGOcopy.png'),
  new restaurantModel.Restaurant("Erbert and Gerbert", 'https://www.erbertandgerberts.com/sandwiches/', './../assets/images/E+BWeb150px.png')
];

//returns the array of restaurants
function getRestaurants(){
  return restaurants;
}

/*Receives the name of a restaurant, seaches for it in the array of restaurants
and returns the corresponding Resturant object if it is found. If it is not
found, the returned Restaurant object is null*/
function getRestaurant(name){
  //initialized restaurant variable to null so it returns null if there is no match
  var restaurant = new restaurantModel.Restaurant(null,null,null);
  for(var x = 0; x < restaurants.length; x++){
    if(name == restaurants[x].name){
      restaurant = new restaurantModel.Restaurant(restaurants[x].name, restaurants[x].link, restaurants[x].image);
    }
  }
  return restaurant;
}

//Exports getRestaurants function and getRestaurant function to be used in other files
module.exports.getRestaurants = getRestaurants;
module.exports.getRestaurant = getRestaurant;

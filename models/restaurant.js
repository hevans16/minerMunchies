/*Creates a Restaurant object with fields name, link, and image.
*/
class Restaurant{
  constructor(name, link, image){
    this._name = name;//holds the restaurant name
    this._link = link;//holds the link to resturant menu
    this._image = image;//holds the link resturant logo image
  }
  get name(){
    return this._name;
  }
  set name(name){
    this._name = name;
  }
  get link(){
    return this._link;
  }
  set link(link){
    this._link = link;
  }
  get image(){
    return this._image;
  }
  set image(image){
    this._image = image;
  }
}
//Exports Restaurant object to be used in other files
module.exports.Restaurant = Restaurant;

//Requires user.js so User objects can be created
var userModel = require('./../models/user.js');
//Creates an array for storing User objects
var users = [];
//Adds a new User object to the array
function addUser(u){
  users.push(new userModel.User(u.username, u.firstName, u.lastName, u.email, u.password));
  console.log('Added user ' + u.username);
}
//Returns the array of User objects
function getUsers(){
  return users;
}
/*Receives the username of a user, seaches for it in the array of users and
returns the corresponding User object if it is found. If it is not
found, the returned User object is null*/
function getUser(username){
  //initialized user variable to null so it returns null if there is no match
  var user = new userModel.User(null,null,null,null,null);
  for(var x = 0; x < users.length; x++){
    if(username == users[x].username){
      console.log('Getting user ' + username);
      user = new userModel.User(users[x].username, users[x].firstName, users[x].lastName,
        users[x].email, users[x].password);
    }
  }
  return user;
}
//Exports all functions to be used in other files
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;

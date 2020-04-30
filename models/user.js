/*Creates a User object with fields username, firstName, lastName,
email, and password.
*/
class User{
  constructor(username, firstName, lastName, email, password){
    this._username = username;//holds the user's username
    this._firstName = firstName;//holds the user's first name
    this._lastName = lastName;//holds the user's last name
    this._email = email;//holds the user's email
    this._password = password;//holds the user's password
  }
  get username(){
    return this._username;
  }
  set username(username){
    this._username = username;
  }
  get firstName(){
    return this._firstName;
  }
  set firstName(firstName){
    this._firstName = firstName;
  }
  get lastName(){
    return this._lastName;
  }
  set lastName(lastName){
    this._lastName = lastName;
  }
  get email(){
    return this._email;
  }
  set email(email){
    this._email = email;
  }
  get password(){
    return this._password;
  }
  set password(password){
    this._password = password;
  }
}
//Exports User object to be used in other files
module.exports.User = User;

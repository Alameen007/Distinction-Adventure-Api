var mongoose = require( 'mongoose' );
var crypto = require('crypto');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var userTaskSchema = require('./userTasks');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  tasks: [userTaskSchema],
  hash: String,
});

userSchema.methods.setPassword = function(password){
  let hash = bcrypt.hashSync(password, 10);  
};

userSchema.methods.validPassword = function(password) {
  let hash = bcrypt.hashSync(password, 10);
  return hash; 
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    firstName: this.lastName,
    gender: this.gender,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


mongoose.model('User', userSchema); 

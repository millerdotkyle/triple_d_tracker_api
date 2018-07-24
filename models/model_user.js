'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewSchema = require('./schema_review');

// Replace mongoose's Promise with ES6 Promise.
mongoose.Promise = global.Promise;

// Define model
const UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: {type: String},
  // visitedLocations: [],
  reviews: [ReviewSchema]
});

UserSchema.methods.serialize = function() {
  return {
    email: this.email || '',
    msg: `User with email: ${this.email} successfully saved`
  };
};

UserSchema.methods.sendReviews = function() {
  return {
    reviews: this.reviews || '',
    msg: `User's review successfully saved`
  };
};

UserSchema.methods.validatePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('user', UserSchema);

module.exports = {User};
// module.exports = User;
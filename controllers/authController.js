'use strict';

const config = require('../config');
const mongoose = require('mongoose');
const {User} = require('../models/model_user');
const jwt = require('jsonwebtoken');

mongoose.connect(config.DATABASE_URL);

const tokenForUser = (user) => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.id,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

// ************************************************************************* //
// signup - BEGIN
// ************************************************************************* //
// NOTE: exports.signup syntax.  Could also use module.exports = { signup(req, res) => {}, } syntax.
exports.signup = (req, res) => {

  // check for required fields - BEGIN
  const requiredFields = ['email', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  // check for required fields - END

  // check for nonStringFields - BEGIN
  const stringFields = ['email', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  // check for nonStringFields - END

  // check for leading/trailing white space - BEGIN
  // If the username and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicitlyTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicitlyTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
  // check for leading/trailing white space - END

  // check for properly sized fields - BEGIN
  // stub
  // check for properly sized fields - END

  // MAIN LOGIC - BEGIN
  const email = req.body.email;
  const password = req.body.password;

  // See if User with the given email exists.
  User
    .findOne({email: email})
    .count()
    .then((count) => {
      if ( count > 0 ) {
        // If User with email DOES exist, return an error.
        // There is an existing user with the same email.
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email already taken',
          location: 'email'
        });
      }
      // If there is no existing user, hash the password.
      return User.hashPassword(password);
    })
    .then(hash => {
      // If a User with email DOES NOT exist, create and save User record.
      return User.create({
        email,
        password: hash
      });
    })
    .then((user) => {
      // // Grider workflow: create a jwt here and send it back in the response.
      return res.status(201).json({
        token: tokenForUser(user),
        userId: user._id
        });

      // Thinkful approach.
      // Respond to request indicating the User was created.
      // return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });

  // MAIN LOGIC - END
};
// ************************************************************************* //
// signup - END
// ************************************************************************* //

// ************************************************************************* //
// signin - BEGIN
// ************************************************************************* //
exports.signin = (req, res) => {
  const userId = req.user._id;
  const visitedLocations = req.user.visitedLocations;
  // TODO - add reviews - send reviews to Client on signup.
  const reviews = req.user.reviews;

  // At signin, User has already had their email and password auth'd.
  //
  // NOTE: passport done function assigns "user" to req.user in passport.js localStrategy();
  //
  // Send JWT token, userId and visitedLocations array to Client.
  res.json({
    token: tokenForUser(req.user),
    userId,
    visitedLocations,
    reviews
  });

};
// ************************************************************************* //
// signin - BEGIN
// ************************************************************************* //
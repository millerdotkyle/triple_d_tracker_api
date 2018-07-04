'use strict';

const {User} = require('../models/model_user');
const { JWT_SECRET } = require('../config');
const passport = require('passport');
// jwt strategy lib
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// local strategy lib
const LocalStrategy = require('passport-local');


// ************************************************************************* //
// Create JWT Strategy - BEGIN
// ************************************************************************* //
// Setup options for JWT Strategy
const jwtOptions = {
  secretOrKey: JWT_SECRET,
  // Thinkful approach: Look for the JWT as a Bearer auth header
  // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),

  // // Grider approach: Look for the JWT on a header named "authorization".
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  // Only allow HS256 tokens - the same as the ones we issue
  algorithms: ['HS256']
};

// Create JWT Strategy.
const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // "payload" is the "decoded" JWT token => {sub: <user.id>, expiresIn: <timestamp> }
  //
  // See if the User ID in the payload exists in our database.
  // payload.subject is the User's ID.

  User.findById(payload.sub, function(err, user) {
    if(err) return done(err, false);

    if(user) {
      // If User exists, call "done", with that User.
      // User is valid, and can have access to Protected Resources.
      done(null, user);
    } else {
      // Otherwise call "done" without a User object.
      // User is not valid, and can NOT have access to Protected Resources.
      done(null, false);
    }
  });


});
// ************************************************************************* //
// Create JWT Strategy - END
// ************************************************************************* //

// ************************************************************************* //
// Create Local Strategy - BEGIN
// ************************************************************************* //

// // Note: Thinkful approach blended with Grider approach.
// // passport, by default, automagically finds the password property on the request.
// // passport, also by default, looks for a field named "username" on the request.
// //
// // But because we did not use a "username" field in our signup,
// // we need to tell passport to substitute the usernameField with "email" field
// // instead.
const localOptions = { usernameField: 'email' };
const localStrategy = new LocalStrategy(localOptions, (email, password, done) => {
  let user;

  User
    .findOne({ email: email })
    .then(_user => {
      user = _user;
      if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      // compare passwords - is "password" from request equal to user.password.
      return user.validatePassword(password); // returns "true" if req.password = user.password.
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }
      // NOTE: passport's done assigns "user" to req.user here.
      //       and req gets passed onto the route handler.
      return done(null, user);
    })
    .catch(err => {
      // console.log('passport.js err = ', err);
      if (err.reason === 'LoginError') {
        return done(null, false, err);
      }
      return done(err, false);
    });

});
// ************************************************************************* //
// Create Local Strategy - END
// ************************************************************************* //

// Tell Passport to use  jwtStrategy.
passport.use(jwtStrategy);
passport.use(localStrategy);

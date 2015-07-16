// load all the things we need and user model
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // -- passport session setup --
    // required for persistent login sessions, passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    // -- LOCAL SIGNUP --
    // we are using named strategies since we have one for login and one for signup. By default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
          process.nextTick(function() {
              // find a user whose email is the same as the forms email, checking if user already exists
              User.findOne({
                  'local.email': email
                }, 

                function(err, user) {
                  // if there are any errors, return the error
                  if (err)
                    return done(err);

                  // check to see if theres already a user with that email
                  if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                    //  If we're logged in, we're connecting a new local account.
                    if (req.user) {
                      var user = req.user;
                      user.local.email = email;
                      user.local.password = user.generateHash(password);
                      user.save(function(err) {
                        if (err)
                          throw err;
                        return done(null, user);
                      });

                    } else {

                      // if there is no user with that email create the user
                      var newUser = new User();
                      newUser.local.email = email;
                      newUser.local.password = newUser.generateHash(password);
                      console.log("creating new user")
                      newUser.save(function(err) {
                        if (err)
                          throw err;
                        return done(null, newUser);
                      });
                    }
                  };
              });
            });
          }));


      // -- LOCAL LOGIN --

      passport.use('local-login', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {

          process.nextTick(function() {
            User.findOne({
              'local.email': email
            }, function(err, user) {
              // if there are any errors, return the error
              if (err)
                return done(err);

              // if no user is found, return the message
              if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

              if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

              // all is well, return user
              else
                return done(null, user);
            });
          });

        }));



      // -- GOOGLE --


      passport.use(new GoogleStrategy({

          clientID: configAuth.googleAuth.clientID,
          clientSecret: configAuth.googleAuth.clientSecret,
          callbackURL: configAuth.googleAuth.callbackURL,
          passReqToCallback: true

        },

        function(req, token, refreshToken, profile, done) {

          process.nextTick(function() {
            if (!req.user) {
              // try to find the user based on their google id
              User.findOne({
                'google.id': profile.id
              }, function(err, user) {
                if (err)
                  return done(err);

                if (user) {

                  // if there is a user id already but no token (user was linked at one point and then removed)
                  // just add our token and profile information
                  if (!user.google.token) {
                    user.google.token = token;
                    user.google.name = profile.name;
                    user.google.email = profile.emails[0].value;

                    user.save(function(err) {
                      if (err)
                        throw err;
                      return done(null, user);
                    });
                  }

                  // if a user is found, log them in
                  return done(null, user);
                } else {
                  // create's a new user if they aren't in db
                  var newUser = new User();

                  newUser.google.id = profile.id;
                  newUser.google.token = token;
                  newUser.google.name = profile.displayName;
                  newUser.google.email = profile.emails[0].value; // pull the first email

                  newUser.save(function(err) {
                    if (err)
                      throw err;
                    return done(null, newUser);
                  });
                }
              });
            } else {
              // user already exists and is logged in, we have to link accounts
              var user = req.user; // pull the user out of the session

              // update the current users google credentials
              user.google.id = profile.id;
              user.google.token = token;
              user.google.name = profile.name;
              user.google.email = profile.emails[0].value;

              // save the user
              user.save(function(err) {
                if (err)
                  throw err;
                return done(null, user);
              });


            }
          });

        }));


    }; // closing module exports
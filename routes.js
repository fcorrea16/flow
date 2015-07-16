var mongoose = require('mongoose');
var User = mongoose.model('User')
var Chart = mongoose.model('Chart')

module.exports = function(app, passport) {

  // -- HOME PAGE (with login links) --
  app.get('/', function(req, res) {

    var currentuser;
    res.render('index')

    
  });


    // -- BUILDER PAGE (with login links) --
  app.get('/builder', function(req, res) {
    res.render('builder');
  });





  // -- PROFILE SECTION --
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user // get the user out of session
    });
  });

  app.post('/profile/update', isLoggedIn, function(req, res) {
    var id = req.user._id

    User.findById(id, function(err, user) {
      if (err) throw err;
      console.log(user["local"]);
      user.local.location = req.body.location;
      user.local.name = req.body.name;
      user.local.picture = req.body['picture-url'];
      user.local.fun_question = req.body['fun-question'];
      user.save(function(err){
        if (err) throw err;
        console.log("user updated, finally")
        console.log(user)
        res.redirect('/profile');
      });

    });

  });





 app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });








  // -- LOGOUT --
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });




  // -- LOGIN --
  app.get('/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));



  // -- SIGNUP --
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));



  



  // -- GOOGLE ROUTES  --
  // send to google to do the authentication. Profile gets us their basic information including their name, and email gets their emails
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));



  // -- AUTHORIZE (ALREADY LOGGED IN)--

  // locally --------------------------------
  app.get('/connect/local', function(req, res) {
    res.render('connect-local', {
      message: req.flash('loginMessage')
    });
  });
  
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // google ---------------------------------

  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
  }));


  // UNLINK ACCOUNTS ---------------------------------
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

    // google ---------------------------------
  app.get('/unlink/google', isLoggedIn, function(req, res) {
    var user = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });


}; // closes module exports


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}
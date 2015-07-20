var mongoose = require('mongoose');
var User = mongoose.model('User')
var Chart = mongoose.model('Chart')
var ObjectId = mongoose.Types.ObjectId
var cool = require('cool-ascii-faces');



module.exports = function(app, passport) {


  app.get('/cool', function(request, response) {
    response.send(cool());
  });

  // -- HOME PAGE (with login links) --
  app.get('/', function(req, res) {
    console.log(req.user)
    res.render('index', {
      user: req.user
    })
  });


    // -- BUILDER PAGE (with login links) --
  app.get('/builder', isLoggedIn, function(req, res) {
    res.render('builder', {
      user: req.user
    });

  });

  app.get('/builder/:id', isLoggedIn, function(req, res) {
    Chart.find({_id: req.params.id}, function(err, info) {
      return res.render('edit', {
        title: info[0].chart.title,
        html: info[0].chart.html,
        user: info[0].user_id[0]
      });
    });
  });

  app.post('/savechart', function(req, res) {
    // console.log(req.body.title)
    // console.log(req.body.content)
    var title = req.body.title;
    var content = req.body.content;
    var currentUser = req.user._id

    var newChart = new Chart();
    newChart.user_id = currentUser;
    newChart.chart.title = title;
    newChart.chart.html = content;

    newChart.save(function(err) {
      if (err) {
        throw err;
        console.log("there was an error")
      } else {
        res.redirect('/chart/' + newChart._id);
        console.log("no errors")
      }
    });
  });

  app.post('/savechart/:id', function(req, res) {
    // console.log(req.body.title)
    // console.log(req.body.content)
    var title = req.body.title;
    var content = req.body.content;
    var currentUser = req.user._id
    
    Chart.findOneAndUpdate({_id: req.params.id}, {
      "$set": { "chart":  { "title":  title, "html": content}}},
       function(err, doc){
        if (err) 
          throw err;
          console.log("there was an error")
    });
  });


   // -- CHART PAGES --
  app.get('/charts/:id', function(req, res) {
    // console.log(req.params.id)
   Chart.find({_id: req.params.id}, function(err, info) {
      // console.log(info[0]._id)
      // console.log(req.user)
      // console.log(info[0].user_id[0])
      // console.log(info[0].chart)
      return res.render('chart', {
        title: info[0].chart.title,
        html: info[0].chart.html,
        user: info[0].user_id,
        chart_id: info[0]._id
      });

    });
  });


  app.get('/charts', function(req, res){
    Chart.find().exec(function(err, chart){
     res.render('charts', {
      user: req.user,
      chart: chart, 
      id: ObjectId
      });
    });
  });

  app.post('/charts/:id/delete', function(req, res){
    console.log(req.params.id); 
    // res.send('got a delete request')
    Chart.findByIdAndRemove(req.params.id, function(err, chart){
      if (err) {
        throw err;
        console.log("there was an error")
      } else {
        res.redirect('/charts');
        console.log("no errors")
      }
    });
  });



  // -- USER SECTION --
  app.get('/users/:id', function(req, res) {

   User.findById(req.params.id, function(err, db_user) {
    if(err) {/*error!!!*/}
      Chart.find({user_id: req.params.id} , function(err, db_charts) {
        console.log(db_user)
        console.log(db_user.google )
        console.log(db_user.local.name === undefined)
        // console.log(db_charts)
        
        if(err) {/*error!!!*/}

        return res.render('user', {
          user: db_user, 
          charts: db_charts,
        })

      });
    });
  });


  // -- PROFILE SECTION --
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
        res.redirect('/users/' + id);
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
    successRedirect: '/builder', // redirect to the secure profile section
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

function currentUserId (req, res){

// console.log(req.session.passport.user)
//     if (req.session.passport.user === undefined) {
//       var id = 0;

//     } else{
//       var id = req.session.passport.user
//     }
//     res.render('index', {
//       user_id: id
//     })
}

// to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
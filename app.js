
// -- SETUP --
// get all the tools we need

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Chart 	 = require('./models/chart');

var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var methodOverride = require('method-override')

// heroku:
var cool = require('cool-ascii-faces');

// -- CONFIG --
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method')); // method override


app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'));

// required for passport
app.use(session({ 
	secret: "helloflow",
  proxy: true,
  resave: true,
  saveUninitialized: true
})); 


// app.use(session({ secret: 'hellosecret' }));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


// -- ROUTES --
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// -- LAUNCH --
app.listen(port);
console.log('The magic happens on port ' + port);



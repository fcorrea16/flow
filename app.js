
// -- SETUP --
// get all the tools we need
var http = require('http');
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

// heroku:
var cool = require('cool-ascii-faces');

// -- CONFIG --
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:1337/');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
// var uristring = 
//   process.env.MONGOLAB_URI || 
//   process.env.MONGOHQ_URL || 
//   'mongodb://localhost/HelloMongoose';


// mongoose.connect(uristring, function (err, res) {
//   if (err) { 
//     console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//   } else {
//     console.log ('Succeeded connected to: ' + uristring);
//   }
// });

// var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];





require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'));

// required for passport
app.use(session({ 
	secret: "helloflow",
  proxy: true,
  resave: true,
  saveUninitialized: true
})); 
    // session secret ilovescotchscotchyscotchscotch
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



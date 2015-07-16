// -- MONGODB --
// var MongoDB     = require('mongodb');
// var MongoClient = MongoDB.MongoClient;
// var ObjectId    = MongoDB.ObjectID;
// var mongoUri    = 'mongodb://localhost:27017/flow'


// -- MONGOOSE --
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);


// -- EXPRESS --
var express = require('express');
var morgan  = require('morgan');
var app     = express();
var port    = 3000;
var path = require('path');



app.use(morgan('combined'));
app.use(express.static('public'));
app.set('view engine', 'ejs');



// -- BODY PARSER --
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// -- COOKIE PARSER --
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// -- PASSPORT AUTHENTICATION -- 
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);



// == SERVER ==
// MongoClient.connect(mongoUri, function(error, db) {
//   if (error) throw error;

// var server = app.listen(port, function() {
//   console.log('listening on port ' + port)
// });

var debug = require('debug')('passport-mongo');


app.set('port', process.env.PORT || 3000);

var server = app.listen(port, function() {
  debug('Express server listening on port ' + server.address().port);
});


var routes = require('/routes/index')(passport);
app.use('/', routes);




  // == CLEANUP ==
process.on('exit', function() {
  db.close();
});
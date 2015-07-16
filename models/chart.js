// load the things we need
var mongoose = require('mongoose');

var chartSchema = mongoose.Schema({
  chart: {
    user_id: String,
    html: String
  }
});

// create the model for charts and expose it to our app
module.exports = mongoose.model('Chart', chartSchema);



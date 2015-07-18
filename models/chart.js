// load the things we need
var mongoose = require('mongoose');

var chartSchema = mongoose.Schema({
  chart: {
    title: String,
    html: String
  },
  user_id: [{ type : mongoose.Schema.ObjectId, ref : 'User' }]
});

// create the model for charts and expose it to our app
module.exports = mongoose.model('Chart', chartSchema);




// user_id: String
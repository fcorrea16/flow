module.exports = {
    'url' : 'mongodb://' + process.env.dbuser +':' + process.env.dbpass + '@ds033569.mongolab.com:33569/charts'
};

// LOCAL
// 'mongodb://localhost/flow'

// MONGOLAB - heroku
// 'mongodb://' + process.env.dbuser +':' + process.env.dbpass + '@ds033569.mongolab.com:33569/charts'
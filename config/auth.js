// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
      'clientID'      : process.env.googleid,
 			'clientSecret'  : process.env.googlesecret,
 			'callbackURL'   : 'http://flowchartbuilder.herokuapp.com/auth/google/callback'
    }

};

//  LOCAL
// 'clientID'      : ENV[‘GOOGLEAUTH_CLIENT_ID’],
// 'clientSecret'  : ENV[‘GOOGLEAUTH_CLIENT_SECRET’],
// 'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'


//  HEROKU
// 'clientID'      : process.env.googleid,
// 'clientSecret'  : process.env.googlesecret,
// 'callbackURL'   : 'http://flowchartbuilder.herokuapp.com/auth/google/callback'

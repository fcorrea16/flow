// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
        'clientID'      : process.env.googleid,
        'clientSecret'  : process.env.googlesecret,
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
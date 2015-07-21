// expose our config directly to our application using module.exports
module.exports = {

    'googleAuth' : {
        'clientID'      : '656874289272-0ehu2a3dsk4b1k1ih27akqic8qvka20s.apps.googleusercontent.com',
        'clientSecret'  : '_OMTkJcwo0REu7kfvGZzoWG2',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};





// 'clientID'      : process.env.googleid,
// 'clientSecret'  : process.env.googlesecret,
// 'callbackURL'   : 'http://flowchartbuilder.herokuapp.com/auth/google/callback'
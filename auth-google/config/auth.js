// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '105968142192-pg3hbvgd2tccf68ldubbjn9ic8782uut.apps.googleusercontent.com',
        'clientSecret'  : 'ccB_ndOcA3JL7akHe9zQtSfg',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
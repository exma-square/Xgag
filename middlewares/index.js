var flash        = require('flash');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('cookie-session');
var stylus       = require('stylus');
var nib          = require('nib');
var passport     = require('passport');

module.exports = function(app) {

  // app.use(favicon(__dirname + '../public/images/error/error.png'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    key: 'sessionId',
    secret: 'session_cookie_secret+sdjfiawe958723',
    cookie: {
      maxAge: 1000 * 60
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(stylus.middleware({
    src: __dirname + '/public/stylus',       // .styl files are located in `views/stylesheets`
    dest: __dirname + '/public/stylesheets', // .styl resources are compiled `/stylesheets/*.css`

    compile : function(str, path) {
      return stylus(str).set('filename', path).set('compress', true).use(nib());
    }
  }));

};
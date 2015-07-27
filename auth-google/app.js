//get all tools
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  key: 'sessionId',
  secret: 'session_cookie_secret+sdjfiawe958723',
  cookie: {
    maxAge: 1000 * 60//session 有效時間
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);

require('./app/routes.js')(app, passport);
require('./config/passport')(passport); // pass passport for configuration


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


process.env.PORT = port;
console.log("env:");
console.log(process.env.NODE_ENV)

module.exports = app;

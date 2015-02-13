var express = require('express');
global.app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
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
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));

/*
 * api
 */
var controllers = require('./controllers');

app.get('/', controllers.root.home);
app.get('/users', controllers.user);
// 註冊
app.post('/create', controllers.users.create);
// 登入
app.post('/login', controllers.users.login);
// 登出
app.get('/logout', controllers.users.logout);

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


module.exports = app;

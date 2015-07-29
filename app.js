var express = require('express');
global.app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
// var session = require('express-session')
var multipart = require('connect-multiparty');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var flash = require('flash');


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
app.use(flash());
app.use(stylus.middleware({
  src: __dirname + '/public/stylus', // .styl files are located in `views/stylesheets`
  dest: __dirname + '/public/stylesheets', // .styl resources are compiled `/stylesheets/*.css`

  compile : function(str, path) {
    return stylus(str).set('filename', path).set('compress', true).use(nib());
  }
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));

/*
 * api
 */
var controllers = require('./controllers');
app.get('/', controllers.root.home);
app.get('/users', controllers.users.overview);
app.get('/post/:id', controllers.posts.post);
// 註冊
app.post('/create', controllers.users.create);
// 登入
app.post('/login', controllers.users.login);
// 登出
app.get('/logout', controllers.users.logout);
app.post('/upload', multipart(), controllers.users.upload);
// 貼文
app.get('/getPosts', controllers.posts.getPosts);
app.get('/detailPost/:id', controllers.posts.detailPost);
// like and dislike
app.get('/like/add/:id', controllers.posts.addLike);
app.get('/dislike/add/:id', controllers.posts.addDislike);
// 新聞貼文
app.get('/news/urlPreview', controllers.news.urlPreview);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.env.PORT = process.env.PORT || 7000;
console.log("env:");
console.log(process.env.NODE_ENV)

module.exports = app;

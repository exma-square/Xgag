var express      = require('express');
var path         = require('path');
var multipart    = require('connect-multiparty');
var app          = express();

/*
 * middlewares
 */
require('./middlewares')(app);

/*
 * view引擎設定
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));

/*
 * api
 */
var controllers = require('./controllers');
app.get('/', controllers.root.home);
app.get('/users', controllers.users.overview);
// 註冊
app.post('/create', controllers.users.create);
// 登入
app.post('/login', controllers.users.login);
// 登出
app.get('/logout', controllers.users.logout);
app.post('/upload', multipart(), controllers.users.upload);
// 貼文
app.get('/getPosts', controllers.posts.getPosts);
// like and dislike
app.get('/like/add/:id', controllers.posts.addLike);
app.get('/dislike/add/:id', controllers.posts.addDislike);
// 新聞貼文
app.get('/news/urlPreview', controllers.news.urlPreview);


/*
 * errorHandler
 */
require('./errorHandler')(app);

module.exports = app;

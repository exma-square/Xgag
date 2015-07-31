
var multipart = require('connect-multiparty');
var users     = require('./users');
var root      = require('./root');
var posts     = require('./posts');
var news      = require('./news');

module.exports = function(app) {

  app.use('/'               , root);
  app.get('/users'          , users.overview);
  // 註冊
  app.post('/create'        , users.create);
  // 登入
  app.post('/login'         , users.login);
  // 登出
  app.get('/logout'         , users.logout);
  app.post('/upload'        , multipart(), users.upload);
  // 貼文
  app.get('/getPosts'       , posts.getPosts);
  // like and dislike
  app.get('/like/add/:id'   , posts.addLike);
  app.get('/dislike/add/:id', posts.addDislike);
  // 新聞貼文
  app.get('/news/urlPreview', news.urlPreview);


  return function(req, res, next) {
      return next();
  };

};
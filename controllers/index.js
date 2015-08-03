
var multipart = require('connect-multiparty');
var users     = require('./users');
var root      = require('./root');
var posts     = require('./posts');
var news      = require('./news');

module.exports = function(app) {

  app.use ('/'               , root);
  app.post('/login'          , users.login);
  app.get ('/logout'         , users.logout);
  app.get ('/users'          , users.overview);
  app.get ('/detailPost/:id' , posts.detailPost);
  app.post('/create'         , users.create);
  app.post('/upload'         , multipart(), users.upload);
  app.get ('/getPosts'       , posts.getPosts);
  app.get ('/like/add/:id'   , posts.addLike);
  app.get ('/dislike/add/:id', posts.addDislike);
  app.get ('/news/urlPreview', news.urlPreview);

  return function(req, res, next) {
      return next();
  };

};
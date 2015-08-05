
var multipart = require('connect-multiparty');
var users     = require('./users');
var root      = require('./root');
var posts     = require('./posts');
var news      = require('./news');

module.exports = function(app , passport) {

  app.use ('/'               , root);
  //app.post('/login'          , users.login);
  app.get('/log-success'     ,isLoggedIn,function(req, res){
        req.session.user = req.user;
        res.redirect('/');
  })
  app.post('/login'          , passport.authenticate('local-login', {
        successRedirect : '/log-success', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));
  app.get ('/logout'         , users.logout);
  app.get ('/users'          , users.overview);
  app.get ('/detailPost/:id' , posts.detailPost);
  //app.post('/create'         , users.create);
  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/log-success', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
  }));
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
  app.get('/auth/google/callback',
          passport.authenticate('google', {
                    successRedirect : '/log-success',
                    failureRedirect : '/'
  }));
  app.post('/upload'         , multipart(), users.upload);
  app.get ('/getPosts'       , posts.getPosts);
  app.get ('/like/add/:id'   , posts.addLike);
  app.get ('/dislike/add/:id', posts.addDislike);
  app.get ('/news/urlPreview', news.urlPreview);
  
  

  return function(req, res, next) {
      return next();
  };

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
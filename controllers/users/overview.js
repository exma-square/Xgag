module.exports = function (req, res){
  posts = null;
  res.render('user.jade', { title: 'OVERVIEW', user: req.session.user, posts: posts || 0 });
};
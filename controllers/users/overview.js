module.exports = function (req, res){
  console.log(req.session.post)
  posts = null;
  res.render('user.jade', { title: 'OVERVIEW', user: req.session.user, posts: posts || 0 });
};
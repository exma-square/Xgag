module.exports = function (req, res){
  res.render('user.jade', { title: 'OVERVIEW', user: req.session.user });
};
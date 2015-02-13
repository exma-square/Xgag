module.exports = function (req, res){
  res.render('user.jade', { title: 'Xgag', user: req.session.user });
};
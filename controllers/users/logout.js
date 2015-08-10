module.exports = function (req, res){
  req.session.user = null;
  req.logout();
  res.redirect('/');
};
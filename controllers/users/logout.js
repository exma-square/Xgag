module.exports = function (req, res){
  req.session.user = null;
  res.redirect('/');
};
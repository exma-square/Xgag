module.exports = function (req, res){
  res.render('index.jade', { title: 'Xgag', user: req.session.user });
};
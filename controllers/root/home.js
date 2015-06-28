module.exports = function (req, res){
  if (req.session.flash.length > 0) {
    delete req.session.flash;
  }

  console.log(req.session.user);
  res.render('index.jade', { title: 'Xgag', user: req.session.user });

};
module.exports = function (req, res){
  if (req.session.flash.length > 0) {
    delete req.session.flash;
  }
  res.render('index.jade', { title: 'Xgag', user: req.session.user});

};
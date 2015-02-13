module.exports = function (req, res){
  res.render('index.jade', { title: 'Xgag', req: req });
};
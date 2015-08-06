var models = require('../../models');

module.exports = function (req, res){
  models.post.find({name: req.user.google.name}).sort({create_date:-1}).exec(function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.render('user.jade', { title: 'OVERVIEW', user: req.user, posts: posts || 0 });
  });
};
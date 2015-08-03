var mongojs = require('mongojs')
var models = require('../../models');

module.exports = function (req, res){
  var id = req.params['id']
  models.posts.find(mongojs.ObjectId(id)).sort({create_date:-1}, function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.json(posts)
    // res.render('postDetail.jade', { title: 'OVERVIEW', user: req.session.user, posts: posts || 0 });
  });
};
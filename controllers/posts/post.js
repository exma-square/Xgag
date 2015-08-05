var mongoose = require('mongoose')
var models = require('../../models');

module.exports = function (req, res){
  var id = req.params['id']
  models.find(mongoose.Types.ObjectId(id)).sort({create_date:-1}).exec(function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.json(posts)
    // res.render('postDetail.jade', { title: 'OVERVIEW', user: req.session.user, posts: posts || 0 });
  });
};
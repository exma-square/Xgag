var models = require('../../models');

module.exports = function (req, res){
  models.posts.find().sort({create_date:1}, function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.json({code: 200, posts: posts});
  });
};
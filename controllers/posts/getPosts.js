var models = require('../../models');

module.exports = function (req, res){
  models.posts.find().sort({create_date:-1}, function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    
    for(key in posts) {
      if (posts[key].like) {
        continue;
      }
      posts[key].like = posts[key].like || [];
      posts[key].dislike = posts[key].dislike || [];
      posts[key].comment = posts[key].comment || [];
    }

    res.json({code: 200, posts: posts});
  });
};
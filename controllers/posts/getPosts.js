var models = require('../../models');

module.exports = function (req, res){

  var countPercent = function(data) {
    var dislike = data.dislike.length;
    var like = data.like.length;

    if (dislike == 0 && like == 0) {
      return {total: 0, like: 0, dislike: 0};
    }

    var total = dislike + like;
    like = Math.ceil(like/total * 100);
    dislike = 100 - like;

    return {
      total: total,
      like: like,
      dislike: dislike
    };
  };

  models.post.find().sort({create_date:-1}).exec(function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    posts = JSON.parse(JSON.stringify(posts));
    for(key in posts) {
      posts[key].like = posts[key].like || [];
      posts[key].dislike = posts[key].dislike || [];
      posts[key].comment = posts[key].comment || [];
      posts[key].percent = countPercent(posts[key]);
    }


    res.json({code: 200, posts: posts});
  });
};
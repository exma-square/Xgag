var models = require('../../models');
var _ = require('lodash');

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

    var keywords = [];
    for(key in posts) {
      posts[key].like = posts[key].like || [];
      posts[key].dislike = posts[key].dislike || [];
      posts[key].comment = posts[key].comment || [];
      posts[key].percent = countPercent(posts[key]);

      if (posts[key].keywords) {
        posts[key].keywords.split(',').forEach(function(keyword){
          if (!keyword) {
            return;
          }

          var targetKeyword = _.find(keywords[keyword], {keyword: keyword});
          if (!targetKeyword) {
            var newKeyword = {
              count: 1,
              url: '/detailPost/' + posts[key]._id,
              image: posts[key].image,
              title: posts[key].title,
              keyword: keyword
            };
            keywords.push(newKeyword);
          } else {
            targetKeyword.count += 1;
          }
        });
      }
    }

    keywords.sort(function(currentVal, nextVal){
      if (currentVal.count < nextVal.count) {
        return 1;
      } else if (currentVal.count > nextVal.count) {
        return -1;
      } else {
        return 0;
      }
    });

    res.json({code: 200, posts: posts, keywords: keywords});
  });
};

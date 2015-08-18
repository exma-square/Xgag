var models = require('../../models');

module.exports = function (req, res){

  models.comment.find().sort({create_date:-1}).exec(function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    posts = JSON.parse(JSON.stringify(posts));
    console.log(posts);
    res.json({code: 200, posts: posts});
  });
};
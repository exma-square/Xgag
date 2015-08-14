var models = require('../../models');
var mongoose = require('mongoose');
var objectIdSelect = mongoose.Types.ObjectId;

module.exports = {
  progressbar:function (req, res){
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

    var id = req.params["id"];

    if ( ! req.session.user) {
      return res.json({
        code: 300,
        message: "please login"
      });
    }

    if (! id) {
      return res.json({
        code: 500,
        message: "id is not defined"
      });
    }
    models.post.findOne({_id: objectIdSelect(id)}).exec(function(err, post){

      if (err)
        return res.json({ code: 500, message: "id is not found" });
      post = JSON.parse(JSON.stringify(post));
      post.percent = countPercent(post);
      return res.render('postDetail.jade', { title: 'post', user: req.session.user, posts: post || 0 });
    });
  },
  addcomment: function(req, res){
    var id = req.params["id"].replace(/id=/g, "");
    var newComment = new models.comment;

    newComment.name = req.session.user.name;
    newComment.creat_date = new Date();
    newComment.message = req.query["comment"];
    if ( ! req.session.user) {
      return res.json({
        code: 300,
        message: "please login"
      });
    }

    if (! id) {
      return res.json({
        code: 500,
        message: "id is not defined"
      });
    }
    newComment.save(function(err) {
      if (err){
        console.error(err);
        return res.send(err);
      }
      console.log('User saved successfully!');
      models.post.update({_id: objectIdSelect(id)}, {$push: { comment: newComment._id}}, 
        function(err, post){
          if (err)
            return res.json({ code: 500, message: "id is not found" });
          res.redirect('/');
      });
    });
  }

};
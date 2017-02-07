var mongoose = require('mongoose');
var moment = require('moment');
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
      var error = {
        code: 300,
        message: "please login"
      }
      return res.render('index.jade', { title: 'Xgag', error: error});
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
      post.create_date = moment(post.create_date).format('YYYY-MM-DD HH:mm');
      var responseMeta = {
        url: config.domain + "detailPost/" + post._id,
        image: post.image,
        description: post.content,
        keywords: "xgag, fun, funny, lol ,wtf ,news, 新聞, 有趣, 好玩, 歡呼, 花惹發",
        author: "exma"
      };
      return res.render('postDetail.jade', { title: post.title, user: req.session.user, posts: post || 0, responseMeta: responseMeta });
    });
  },
  addcomment: function(req, res){
    var date = new Date();
    var id = req.params["id"].replace(/id=/g, "");
    console.log(req.session.user);
    var newComment = new models.comment;

    newComment.user = req.session.user.id;
    newComment.create_date = date;
    newComment.message = req.body.message;
    newComment.status = req.body.status;
    if ( ! req.session.user || typeof req.session.user==undefined) {
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

          return res.json({
            code: 200,
            message: "success",
            data: newComment
          });
      });
    });
  }
};

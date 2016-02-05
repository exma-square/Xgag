var mongoose = require('mongoose');
var objectIdSelect = mongoose.Types.ObjectId;
var async = require('async');

module.exports = function (req, res){
  var id = req.params["id"].replace(/id=/g, "");
  models.post.findOne({_id: objectIdSelect(id)})
  .populate('comment')
  .exec(function(err, post){
    if (err)
      return res.json({ code: 500, message: "id is not found" });
    post = JSON.parse(JSON.stringify(post));
    console.log("Post:" , post);
    async.eachSeries(post.comment, function iterator(comment, callback) {
      console.log(comment);
      models.user.findOne({"user.id":comment.user})
      .exec(function(err, user){
         comment.user = user;
         callback();
      });
    },function(){
      if (err)
        return res.json({ code: 500, message: "id is not found" });
      // models.user.find({id: post.comment})
      return res.json({comment: post.comment});
    });
    // post.comment.forEach(function(comment,key){
    //   models.user.findOne({"user.id":comment.user})
    //   .exec(function(err, user){
    //     post.comment[key].user = user;
    //     console.log(comment,key);
    //   });
    // });


  });
};
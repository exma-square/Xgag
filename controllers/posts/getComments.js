var mongoose = require('mongoose');
var objectIdSelect = mongoose.Types.ObjectId;

module.exports = function (req, res){
  var id = req.params["id"].replace(/id=/g, "");
  models.post.findOne({_id: objectIdSelect(id)})
  .populate('comment')
  .exec(function(err, post){
    if (err)
      return res.json({ code: 500, message: "id is not found" });
    post = JSON.parse(JSON.stringify(post));
    console.log("Post:" , post);
    users = post.comment.map(function(obj){
      return obj.user;
    });
    console.log(users);
    for(user in users){
      models.user.findOne({'user.id':users[user]})
      .exec(function(err,user_info){
        console.log(user_info.user);
      });
    }
      if (err)
        return res.json({ code: 500, message: "id is not found" });
    // models.user.find({id: post.comment})
      return res.json({comment: post.comment , user: user});

  });
};
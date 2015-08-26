var mongoose = require('mongoose');
var objectIdSelect = mongoose.Types.ObjectId;

module.exports = function (req, res){
  var id = req.params["id"].replace(/id=/g, "");
  var newComment = new models.comment;
  models.post.findOne({_id: objectIdSelect(id)}).exec(function(err, post){
    if (err)
      return res.json({ code: 500, message: "id is not found" });
    post = JSON.parse(JSON.stringify(post));
    models.comment.find({
      '_id': { $in: post.comment}
    }, function(err, result){
      if (err)
        return res.json({ code: 500, message: "id is not found" });
      return res.json({result: result});
    });
  });
};
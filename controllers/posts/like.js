var mongoose = require('mongoose')
var models = require('../../models');

module.exports = {
  addlike: function (req, res) {
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

    models.post.update({_id: mongoose.Types.ObjectId(id)}, {$push: { like: req.session.user._id }}, function(err, post){
      if (err)
        return res.json({ code: 500, message: "id is not found" });

      return res.json({code: 200, post: post});
    });
  },

  adddislike: function (req, res) {
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

    models.post.update({_id: mongoose.Types.ObjectId(id)}, {$push: { dislike: req.session.user._id }}, function(err, post){
      if (err)
        return res.json({ code: 500, message: "id is not found" });

      return res.json({code: 200, post: post});
    });
  }
};

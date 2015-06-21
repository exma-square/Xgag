var models = require('../../models');
var mongojs = require('mongojs')
// var mongo = require('mongodb');
// var BSON = mongo.BSONPure;
module.exports = function (req, res){
  var likeParam = {
    user: req.body,
    updateTime: new Date()
  },
  userId = req.session.user['_id']
  console.log(userId)
  models.users.findOne({"_id": mongojs.ObjectId(userId)}, function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.json({code: 200, posts: posts});
  });
  // res.json(req.session);
}
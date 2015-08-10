var mongoose = require('mongoose')
var models = require('../../models');
var objectIdSelect = mongoose.Types.ObjectId;

module.exports = function (req, res){
  var id = req.params['id']
  models.findOne(mongoose.Types.ObjectId(id)).sort({create_date:-1}).exec(function(err, posts){
    if(err){
      console.error(err);
      return res.send(err);
    }
    res.json(posts)
  });
};
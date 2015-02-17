var fs = require('fs');
var path = require('path');
var rootPath = require('app-root-path').path;
var async = require('async');
var models = require('../../models');
var _ = require('lodash');

module.exports = function (req, res){
  var date = new Date()
  async.waterfall([
    function getImage(cb){
      var imageFile = req.files.image.originalFilename
      var filename = req.session.user.name + '_' + date.getTime() + '.' + imageFile.split('.').pop();
      var targetPath = rootPath + '/public/images/users/' + filename;
      fs.createReadStream(req.files.image.ws.path).pipe(fs.createWriteStream(targetPath));
      cb(null, filename)
    },

    function pickFields(filename, cb){
      var options = _.pick(req.body, 'title');
      options['image'] = filename;
      options['name'] = req.session.user.name;
      cb(null, options);
    },

    function validateData(options, cb){
      if(!options.title){
        return cb(new Error('沒有 title'));
      }

      if(!options.image){
        return cb(new Error('沒有 image'));
      }

      if(!options.name){
        return cb(new Error('沒有 name'));
      }

      cb(null, options);
    },

    function insert(options, cb){
      options['create_date'] = date
      models.posts.insert(options, cb);
    }
  ], function (err, newPost){

    if(err){
      console.error(err);
      return res.send(err);
    }
    req.session.post = _.pick(newPost, 'title', 'image', 'name');

    res.redirect('/');
  });
};
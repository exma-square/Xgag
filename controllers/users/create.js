var async = require('async');
var models = require('../../models');
var _ = require('lodash');


module.exports = function (req, res){
  async.waterfall([
    function checkUser(cb){
      models.users.findOne({ email: req.body.email }, cb);
    },

    function pickFields(user, cb){
      if(user){
        return cb(new Error('email 已經存在'));
      }

      var options = _.pick(req.body, 'email', 'password', 'name');
      cb(null, options);
    },

    function validateData(options, cb){
      if(!options.email){
        return cb(new Error('沒有 email'));
      }

      if(!options.password){
        return cb(new Error('沒有 password'));
      }

      if(!options.name){
        return cb(new Error('沒有 name'));
      }

      cb(null, options);
    },

    function insert(options, cb){
      models.users.insert(options, cb);
    }
  ], function (err, newUser){

    if(err){
      console.error(err);
      return res.send(err);
    }

    req.session.user = _.pick(newUser, '_id', 'email', 'name');

    res.redirect('/');
  });
};
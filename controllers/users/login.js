var async = require('async');
var models = require('../../models');
var _ = require('lodash');

module.exports = function (req, res){
  async.waterfall([
    function pickFields(cb){
      var options = _.pick(req.body, 'email', 'password');

      cb(null, options);
    },

    function validata(options, cb){

      if(!options.email){
        console.log('登入，缺少 email');
        return res.send('登入，缺少 email');
      }

      if(!options.password){
        console.log('登入，缺少 password');
        return res.send('登入，缺少 password');
      }

      cb(null, options);
    },

    function findUser(options, cb){
      models.users.findOne({
        email: options.email,
        password: options.password
      }, cb);
    }
  ], function (err, user){
    if(err){
      console.log(err);
      return res.redirect('/');
    }

    if(!user){
      console.log('找不到帳號，請註冊');
      return res.redirect('/');
    }

    req.session.user = user;

    res.redirect('/');
  });
};
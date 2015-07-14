var models = require('../../models');
var mongojs = require('mongojs');
var _ = require('lodash');
var async = require('async');

module.exports = {
  getMessage: function (req, res){
    var date = new Date();
    var message = req.body
    console.log(req.body)
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
  },
  addMessage: function (req, res){
    var id = req.params["id"];
    console.log("###########")
    console.log(id)
    console.log(req.body)
    console.log("###########")
    // async.waterfall([
    //   function pickFields(cb){
    //     var options = _.pick(req.body, 'email', 'password');

    //     cb(null, options);
    //   },

    //   function validata(options, cb){

    //     if(!options.email){
    //       console.log('登入，缺少 email');
    //       return res.send('登入，缺少 email');
    //     }

    //     if(!options.password){
    //       console.log('登入，缺少 password');
    //       return res.send('登入，缺少 password');
    //     }

    //     cb(null, options);
    //   },

    //   function findUser(options, cb){
    //     models.users.findOne({
    //       email: options.email,
    //       password: options.password
    //     }, cb);
    //   }
    // ], function (err, user){
    //   if(err){
    //     console.log(err);
    //     return res.redirect('/');
    //   }

    //   if(!user){
    //     req.flash('warn', '找不到帳號，請註冊');
    //     return res.redirect('/');
    //   }

    //   req.session.user = user;

    //   res.redirect('/');
    // });
  }
}
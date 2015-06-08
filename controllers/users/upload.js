// var fs = require('fs');
// var path = require('path');
// var rootPath = require('app-root-path').path;
var async = require('async');
// var mkdirp = require('mkdirp');
var models = require('../../models');
var _ = require('lodash');
var request = require("request");
var cheerio = require("cheerio");

module.exports = function (req, res){
  var date = new Date();
  
  async.waterfall([

    function getUrl(cb){
      var newsINFO = null,
        newsURL = req.body['user-post-url'],
        postTitle = req.body['user-post-title'];
      request({
        url: newsURL
      },
      function (error, response, html){
        if(!error && response.statusCode == 200){
          var $ = cheerio.load(html);
          var time = $(".news-time").text();
          var content = $(".story");
          var newspic = content.find('img').attr('src')
          newsINFO = {
            name: req.session.user.name,
            title: postTitle,
            newsTitle: $('meta[property="og:title"]').attr('content'),
            image: $('meta[property="og:image"]').attr('content'),
            create_date: date,
            content: $('meta[name="description"]').attr('content'),
            url: $('meta[property="og:url"]').attr('content'),
            site_name: $('meta[property="og:site_name"]').attr('content')
          };
          return cb(null, newsINFO);
        } else {
          res.statusCode = 404;
          var error = {
            status: 'error',
            message: 'fail to request'
          }
          return cb(new Error(error));
        }
      });
    },

    function pickFields(newsINFO, cb){
      models.posts.insert(newsINFO, cb);
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
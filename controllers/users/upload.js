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
      var newsINFO = new models.post,
        newsURL = req.body['user-post-url'];
        
      request({
        url: newsURL
      },
      function (error, response, html){
        if(!error && response.statusCode == 200){
          var $ = cheerio.load(html);
          var time = $(".news-time").text();
          var content = req.body['user-post-description']?req.body['user-post-description']:$('meta[name="description"]').attr('content');
          var postTitle = req.body['user-post-title']?req.body['user-post-title']:$('meta[property="og:title"]').attr('content');
          /*newsINFO = {
            name: req.session.user.name,
            title: postTitle,
            newsTitle: $('meta[property="og:title"]').attr('content'),
            image: $('meta[property="og:image"]').attr('content'),
            create_date: date,
            content: content,
            url: $('meta[property="og:url"]').attr('content'),
            site_name: $('meta[property="og:site_name"]').attr('content')
          };*/
          newsINFO.name = req.session.user.name;
          newsINFO.title = postTitle;
          newsINFO.newsTitle = $('meta[property="og:title"]').attr('content');
          newsINFO.image = $('meta[property="og:image"]').attr('content');
          newsINFO.create_date = date;
          newsINFO.content = content;
          newsINFO.url = $('meta[property="og:url"]').attr('content');
          newsINFO.site_name = $('meta[property="og:site_name"]').attr('content');
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
    function addDefault(newsINFO, cb){
      newsINFO.like = [];
      newsINFO.dislike = [];
      newsINFO.comment = [];
      return cb(null, newsINFO);
    },
    function pickFields(newsINFO, cb){
      newsINFO.save(function(err) {
                    if (err){
                      console.error(err);
                      return res.send(err);
                    }
                    console.log('User saved successfully!');
                    res.redirect('/');
      });
    }
  ], function (err, newPost){

  });
};
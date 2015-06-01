var request = require("request");
var cheerio = require("cheerio");
module.exports = function (req, res){
  var newsURL = 'http://www.ettoday.net/news/20150529/513504.htm';
  var newsINFO = [];
  request({
    url: newsURL
  },
  function (error, response, html){
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);
      var time = $(".news-time").text();
      var content = $(".story");
      var newspic = content.find('img').attr('src')
      newsINFO.push({
        title: $("h2.title").text(),
        newspic: newspic,
        time: time,
        content: content.find('p').toString(),
        url: newsURL
      });
      res.json(newsINFO);
    } else {
      res.statusCode = 404;
      res.json({
        status: 'error',
        message: 'fail to request'
      });
    }
  });
};

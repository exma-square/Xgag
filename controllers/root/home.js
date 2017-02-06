module.exports = function (req, res){
  if (req.session.flash.length > 0) {
    delete req.session.flash;
  }
  var changeMeta = {
    fb: {
      title: "Xgag",
      url: config.domain,
      image: config.domain + "images/xgaglogo.png",
      description: "Xgag 是台灣的一個新聞平台，提供各種有趣, 好玩, 歡呼, 花惹發等新聞內容互動體驗，提供使用者全面且豐富的閱讀感受，我們是 Xgag。"
    },
    google: {
      title: "Xgag",
      image: config.domain + "images/xgaglogo.png",
      description: "Xgag 是台灣的一個新聞平台，提供各種有趣, 好玩, 歡呼, 花惹發等新聞內容互動體驗，提供使用者全面且豐富的閱讀感受，我們是 Xgag。"
    }
  }
  res.render('index.jade', { title: 'Xgag', user: req.session.user, changeMeta: changeMeta});

};

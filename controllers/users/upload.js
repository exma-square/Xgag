var fs = require('fs');
var path = require('path');
var rootPath = require('app-root-path').path;

module.exports = function (req, res){
  var filename = req.files.image.originalFilename || path.basename(req.files.image.ws.path);
  var targetPath = rootPath + '/public/' + filename;
  //copy file
  fs.createReadStream(req.files.image.ws.path).pipe(fs.createWriteStream(targetPath));
  //return file url
  res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
};
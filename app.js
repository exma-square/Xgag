var express      = require('express');
var path         = require('path');

var app          = express();

/*
 * middlewares
 */
require('./middlewares')(app);

/*
 * view引擎設定
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));

/*
 * api
 */
require('./controllers')(app);

/*
 * errorHandler
 */
require('./errorHandler')(app);

module.exports = app;

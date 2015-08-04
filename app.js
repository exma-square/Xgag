var express      = require('express');
var path         = require('path');
var app          = express();


/*
 * 載入全域變數與設定
 */
require('./Global');

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


// require('./controllers/auth/routes')(app,passport);
// require('./config/passport')(passport);

/*
 * api
 */
require('./controllers')(app);

/*
 * errorHandler
 */
require('./errorHandler')(app);

module.exports = app;

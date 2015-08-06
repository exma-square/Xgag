var mongoose = require('mongoose');

mongoose.connect(config.url);
console.log('Mongodb connect to : ' + config.url);

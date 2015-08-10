var mongoose = require('mongoose');

mongoose.connect(config.mongodb.url);
console.info('Mongodb connect to : ' + config.mongodb.url);

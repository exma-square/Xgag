var mongoose = require('mongoose');

mongoose.connect(database.url);
console.log('Mongodb connect to : ' + database.url);

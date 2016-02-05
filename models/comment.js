// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var commentSchema = mongoose.Schema({
    user        : [{ type: String, ref: 'User' }],
    create_date : Date,
    message     : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Comment', commentSchema);
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var postSchema = mongoose.Schema({
    name        : String,
    title       : String,
    newsTitle   : String,
    image       : String,
    tag         : String,
    create_date : Date,
    keywords    : String,
    content     : String,
    url         : String,
    site_name   : String,
    like        : Array,
    dislike     : Array,
    percent     : String,
    comment     : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);
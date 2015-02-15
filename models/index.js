var mongojs = require('mongojs'),
  db = mongojs('mongodb://localhost:27017/xgag'),
  users = db.collection('users'),
  posts = db.collection('posts')

module.exports = {
  users: users,
  posts: posts
};
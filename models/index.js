var mongojs = require('mongojs'),
  dbURI = (process.env.NODE_ENV === "production") ? process.env.MONGO_URI : 'mongodb://localhost:27017/xgag',
  db = mongojs(dbURI),
  users = db.collection('users'),
  posts = db.collection('posts')

module.exports = {
  users: users,
  posts: posts
};
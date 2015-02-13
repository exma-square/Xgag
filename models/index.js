var mongojs = require('mongojs'),
  db = mongojs('mongodb://localhost:27017/xgag'),
  users = db.collection('users')

module.exports = {
  users: users
};
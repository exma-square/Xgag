module.exports = {
  getPosts: require('./getPosts'),
  addLike: require('./like').addlike,
  addDislike: require('./like').adddislike,
  addMessage: require('./message').addMessage,
  getMessage: require('./message').getMessage
};
module.exports = {
  getPosts: require('./getPosts'),
  addLike: require('./like').addlike,
  addDislike: require('./like').adddislike,
  addComment: require('./detailPost').addcomment,
  detailPost: require('./detailPost').progressbar
};
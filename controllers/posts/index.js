module.exports = {
  getPosts: require('./getPosts'),
  addLike: require('./like').addlike,
  addDislike: require('./like').adddislike,
  addComment: require('./detailPost').addcomment,
  getComment: require('./getComments'),
  detailPost: require('./detailPost').progressbar
};
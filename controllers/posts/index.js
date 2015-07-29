module.exports = {
  getPosts: require('./getPosts'),
  addLike: require('./like').addlike,
  addDislike: require('./like').adddislike,
  detailPost: require('./detailPost/:id')
};
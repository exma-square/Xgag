//使用者頁面
module.exports = function(req, res){
  var userName = req.params.id;
  var userPosts = [];

  console.log(req.params.id)
  // for (var i = 0; i < postList.length; i++) {
  //   if(postList[i].name == userName){
  //     userPosts.push(postList[i]);
  //   }
  // }

  // checkLoginStatus(req, res);
  console.dir(req.session.user._id)
  res.render( 'post.jade', {
    title : userName + '的頁面',
    title: 'Xgag',
    user: req.session.user
  });

};
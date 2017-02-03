$(function(){

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.4";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var likeHandler = function (type, target) {
      // progress-dislike
      var likeNode = target.find(".like");
      var dislikeNode = target.find(".dislike");
      var like, dislike, total;

      if (type === "like") {
        like = parseInt(likeNode.html(), 10) + 1;
        dislike = parseInt(dislikeNode.html(), 10);
        likeNode.html(like);
        target.find("input").css("background-color","#ACD6FF");
      } else {
        like = parseInt(likeNode.html(), 10);
        dislike = parseInt(dislikeNode.html(), 10) + 1;
        dislikeNode.html(dislike);
        target.find("input").css("background-color","#FFB5B5");
      }

      total = dislike + like;
      like = Math.ceil(like/total * 100);
      dislike = 100 - like;
      target.find(".progress-dislike").css({width: dislike + "%"});
      target.find(".progress-like").css({width: like + "%"});
  };

  var getPostsAjax = function(){
    $.get( "/getPosts", function( data ) {
      getTopLikePosts(data.posts);
      getNewestPosts(data.posts);
      getTopDislikePosts(data.posts);

      for (var key in data.posts){
        $("#contentTmpl").tmpl(data.posts[key]).appendTo(".post-clump");
        getCommentsAjax(data.posts[key]._id);
      }
      $('.comment-btn').on('click', function(){
        $(this).parent().parent().find('textarea').focus();
      });
      $("img").on('error', function () {
        $(this).attr("src", "/images/error/error.png");
      });
    });
  };

  window.getPostsAjax = getPostsAjax;

  var getCommentsAjax = function(postId){
    $.get("/getComments/" + postId , function(data){
      console.log(data);
      $("#commentTmpl").tmpl(data.comment).appendTo("#"+postId+" > div.comment-box > div.comment-area");
    });
  };

  var getTopLikePosts = function(posts) {
    var clonePosts = JSON.parse(JSON.stringify(posts));
    posts.sort(function (currentVal, nextVal){
      if (currentVal.like.length < nextVal.like.length) {
        return 1;
      } else if (currentVal.like.length > nextVal.like.length) {
        return -1;
      } else {
        return 0;
      }
    });

    var topLikePostsEl = $("#top-like-posts");
    var topLikePostTotal = 0;
    posts.forEach(function(post) {
      if (topLikePostTotal > 6) {
        return;
      }

      var tpl = "<article class='layout-list-item'>";
      tpl += "<a href='/detailPost/" + post._id + "'>";
      tpl += "<div class='post-image'>";
      tpl += "<img class='attachment-thumbnail' width='150' height='150' src='' alt='' />";
      tpl += "</div>";
      tpl += "<div class='post-meta'>";
      tpl += "<h4>" + post.title + "</h4>";
      tpl += "<p class='post-date text-muted'>" + moment(post.create_date).format("YYYY/MM/DD") + "</p>";
      tpl += "</div></a>";
      tpl += "</article>";

      topLikePostsEl.append(tpl);
      topLikePostTotal += 1;
    });
  };

  var getTopDislikePosts = function (posts){
    var clonePosts = JSON.parse(JSON.stringify(posts));
    posts.sort(function (currentVal, nextVal){
      if (currentVal.dislike.length < nextVal.dislike.length) {
        return 1;
      } else if (currentVal.dislike.length > nextVal.dislike.length) {
        return -1;
      } else {
        return 0;
      }
    });

    var topDislikePostsEl = $("#menu-footer-menu");
    var topDislikePostTotal = 0;

    posts.forEach(function(post) {
      if (topDislikePostTotal > 3) {
        return;
      }

      var tpl = "<li class='menu-item-type-post_type menu-item-object-page'>";
      tpl += "<a href='/detailPost/" + post._id + "'>";
      tpl += post.title;
      tpl += "</a></li>";

      topDislikePostsEl.append(tpl);
      topDislikePostTotal += 1;
    });
  };

  var getNewestPosts = function (posts){
    var clonePosts = JSON.parse(JSON.stringify(posts));
    posts.sort(function (currentVal, nextVal){
      if (currentVal.create_date < nextVal.create_date) {
        return 1;
      } else if (currentVal.create_date > nextVal.create_date) {
        return -1;
      } else {
        return 0;
      }
    });

    var newestPostsEl = $("#newest-posts");
    var newestPostTotal = 0;
    posts.forEach(function(post) {
      if (newestPostTotal > 3) {
        return;
      }

      var tpl = "<article class='layout-grid-item'>";
      tpl += "<a href='/detailPost/" + post._id + "'>";
      tpl += "<div class='post-image'>";
      tpl += "<img class='attachment-md' width='150' height='150' src='' alt='' />";
      tpl += "</div>";
      tpl += "<div class='post-meta'>";
      tpl += "<h4>" + post.content + "</h4>";
      tpl += "<p class='post-date text-muted'>" + moment(post.create_date).format("YYYY/MM/DD") + "</p>";
      tpl += "</div></a>";
      tpl += "</article>";

      newestPostsEl.append(tpl);
      newestPostTotal += 1;
    });
    console.log('posts:: ', posts);
  };

  $("#user-post-url").focusout(function(){
    var url = $(this).val();
    $.get( "/news/urlPreview", {url:url}, function( data ) {
      var string = "<h3 class='preview-title'>${title}</h3><p>${content}</p><img class='img-rounded' style='width:100%' src='${newspic}'/>";
      $("#news-prewiew").html($.tmpl( string, data ));
    });
  });

  $(".container" ).delegate(".motion", "click", function(e) {
    e.preventDefault();

    var target = $(e.currentTarget);
    var url = target.attr("href");
    var id = url.split("/").pop();

    $.get(target.attr("href"), function (result) {

      if (result.code !== 200) {
        console.log(result);
        return alert("Please login and try again");
      }

      var inTarget = (url.indexOf("dislike") > -1 ) ? "dislike" : "like";

      likeHandler(inTarget, $("#" + id))
      // var actionTarget = $("#" + id + " ." + inTarget);
      // actionTarget.html(parseInt(actionTarget.html(), 10) + 1);

      return;
    });

  });
});

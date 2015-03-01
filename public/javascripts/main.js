var getImgUrl = function () {
  return window.location.origin + '/images/users/' + this.data.image;
}

$.get( "/getPosts", function( data ) {
  $("#contentTmpl").tmpl(data.posts).appendTo(".post-clump");
  $("img").error(function () {
    $(this).attr("src", "/images/error/error.png");
  });
});

$(function(){
  var getImgUrl = function () {
    return window.location.origin + '/images/users/' + this.data.image;
  };

  $.get( "/getPosts", function( data ) {
    $("#contentTmpl").tmpl(data.posts).appendTo(".post-clump");
    $("img").error(function () {
      $(this).attr("src", "/images/error/error.png");
    });
  });

  $("#user-post-url").focusout(function(){
    $.get( "/news/urlPreview", function( data ) {
      $.tmpl( "<h3><b>${title}</b></h3><img src='${newspic}'/>", data ).appendTo( "#news-prewiew" );
    });
  });
});

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
    var url = $(this).val();
    $.get( "/news/urlPreview", {url:url}, function( data ) {
      var string = "<img style='width:100%' src='${newspic}'/><h4>${title}</h4><p>${content}</p>";
      $("#news-prewiew").html($.tmpl( string, data ));
    });
  });
});

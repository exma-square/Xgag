$(function(){
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

  $(".container" ).delegate(".motion", "click", function(e) {
    e.preventDefault();
    var target = $(e.currentTarget);
    console.log(e);
    var url = target.attr("href");
    var id = url.split("/").pop();
    $.get(target.attr("href"), function (result) {
      
      if (result.code !== 200) {
        console.log(result);
        return alert("Please login and try again");  
      }
      var inTarget = (url.indexOf("dislike") > -1 ) ? "dislike" : "like";
      var actionTarget = $("#" + id + " ." + inTarget);
      actionTarget.html(parseInt(actionTarget.html(), 10) + 1);
      return;
    })

  });
});

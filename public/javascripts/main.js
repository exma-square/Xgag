$(function(){

  $.get( "/getPosts", function( data ) {
    console.log(data)
    $("#contentTmpl").tmpl(data.posts,{ 
          myValue: "somevalue", 
          count: function() {
            data = this.data.messages
            console.log(this.data.messages)
            if(data)
              return Object.keys(data).length;
            return 0;
          },
          message: function() {
            $("#contentTmplComment").tmpl(this.data.messages).appendTo(".aaa");
            return true;
          }
      }).appendTo(".post-clump");
    $('.comment-btn').on('click', function(){
      $(this).parent().parent().find('textarea').focus();
    });
    $("img").error(function () {
      $(this).attr("src", "/images/error/error.png");
    });
  });

  $("#user-post-url").focusout(function(){
    var url = $(this).val();
    $.get( "/news/urlPreview", {url:url}, function( data ) {
      var string = "<h3 class='preview-title'>${title}</h3><p>${content}</p><img class='img-rounded' style='width:100%' src='${newspic}'/>";
      $("#news-prewiew").html($.tmpl( string, data ));
    });
  });
  
});

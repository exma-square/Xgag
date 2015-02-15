$.get( "/getPosts", function( data ) {
  data.posts.forEach(function(v, i){
    var post_layout = '<div class="post jumbotron"><div class="post-header"><h3 class="item-title"><a href="#" class="badge-evt badge-track">' + 
      v.title + '</a></h3></div><div class="post-body"><a href="#" style="min-height:360px;" class="badge-evt badge-track badge-track-no-follow"><img src="' + 
      window.location.origin + '/images/users/' + v.image + '" class="badge-item-img"/></a></div><div class="post-footer"></div></div>';
    $( ".post-clump" ).append( post_layout );
  })
});

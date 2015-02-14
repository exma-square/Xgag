function uploadFile(){
  var formData = new FormData($("#frmUploadFile")[0]);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
      if(200 === data.code) {
        $("#imgShow").attr('src', data.msg.url);
        console.log('上傳成功');
      } else {
        console.log('上傳失敗');
      }
      console.log('imgUploader upload success, data:', data);
    },
    error: function(data){
      console.error(data)
    }
  });
}

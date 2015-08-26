var socketio = require('socket.io'),
    io;
exports.io = function(server){

  io = socketio.listen(server);

  io.sockets.on('connection' , function(socket){
      //初始連結時的事件觸發
      socket.emit('init' , {
          id: socket.id
      });
      //submit後的事件觸發
      socket.on('submit' , function(data){
          
      });

    })
}

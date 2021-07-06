var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/')
})


io.on('connection', socket => {
  var username;
  socket.on('crearUsuario',function(data) {
    username = data
  })

  socket.on('mensajeNuevo',function(data) {

    socket.broadcast.emit('mensaje',{
      username: username,
      mensaje:data
    })

    socket.emit('mensaje',{
      username: username,
      mensaje:data
    })

    
  })
})

http.listen(3006,function*(){
  console.log('Server Ready');
})


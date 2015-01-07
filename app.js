var app = require('express')();
var moment = require('moment');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static')


moment().format();

app.use(serveStatic('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
  socket.on('chat message', function(message){
    message.time = moment().format("h:mm A");
    io.emit('chat message', message);
    console.log(message);
  });
  socket.on('image message', function(message){
    message.time = moment().format("h:mm A");
    io.emit('image message', message);
    console.log('Image message sent');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
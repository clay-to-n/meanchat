var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
  socket.on('chat message', function(message){
    console.log(message);
    io.emit('chat message', message);
    var myDate = new Date(Date.now());
	var options = { weekday: 'narrow', year: 'numeric', month: 'long', day: 'numeric', hour12: 'true' };
    console.log(myDate.toLocaleString('en-US', options));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
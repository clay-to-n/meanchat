var app = require('express')();
var moment = require('moment');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static')

var mongo = require('mongodb').MongoClient;
var format = require('util').format;

mongo.connect('mongodb://127.0.0.1:27017/mydb', function(err, db) {
  if(err) throw err;

  var collection = db.collection('meanchat');
  //collection.insert({a:2}, function(err, docs) {

    // collection.count(function(err, count) {
    //   console.log(format("count = %s", count));
    // });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
      console.dir(results);
      // Let's close the db
      db.close();
    });
  });
//});


// mongo.connect('mongodb://127.0.0.1:27017/mydb', function (err, db) {
//     var collection = db.collection('meanchat');
//     collection.insert({ content: msg }, function (err, o) {
//         if (err) { console.warn(err.message); }
//         else { console.log("chat message inserted into db: " + msg); }
//     });
// });

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
var app   = require('express')();           //Add express js as node framework
var http  = require('http').Server(app);    //Add http node js
var io    = require('socket.io')(http);    //Add socket.io module

app.get('/', function(req, res){
  // res.send('<h1>Hello World</h1>'); //Function to send out message to the client...
  // Since we'll be sending out an html its best to use sendFile();
  res.sendFile(__dirname+'/index.html');
})

// Bind connection on web socket.
io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('disconnect', function(){ //bind disconnect event to socket.
      console.log('A user disconnected');
    });

    socket.on('chat-message', function(msg){
      console.log("message: "+msg);
      io.emit('chat-message', msg);
    })
})


http.listen(3000, function(){
  console.log('listening on *:3000');
})

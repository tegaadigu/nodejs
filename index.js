var app   = require('express')();           //Add express js as node framework
var http  = require('http').Server(app);    //Add http node js
var io    = require('socket.io')(http);    //Add socket.io module

app.get('/', function(req, res){
  // res.send('<h1>Hello World</h1>'); //Function to send out message to the client...
  // Since we'll be sending out an html its best to use sendFile();
  res.sendFile(__dirname+'/index.html');
});

app.get('/message', function(req, res) {
  // console.log(req.query);
  // console.log(res.query);
  if(req.query.room)
    console.log('yes room is: '+req.query.room);

    if(req.query.msg)
      console.log('msg is :'+req.query.msg);


  io.sockets.to(req.query.room).emit('chat-message', req.query.msg);
})

// Bind connection on web socket.
io.on('connection', function(socket){
    // Join Private channel..
    socket.on('join', function(room){
      console.log('A user connected to room-' + room);
      socket.join(room);
      socket.on('chat-message', function(msg){
        console.log("message to room-"+room+ ": "+msg);
        // io.emit('chat-message', msg);
        socket.broadcast.to(room).emit('chat-message', msg);
      })
    })

    socket.on('disconnect', function(room){ //bind disconnect event to socket.
      console.log('A user disconnected from room: '+room);
    });

    // socket.on('chat-message', function(msg){
    //   console.log("message: "+msg);
    //   // io.emit('chat-message', msg);
    //   // socket.broadcast.emit('chat-message', msg);
    // })
})


http.listen(3000, function(){
  console.log('listening on *:3000');
})

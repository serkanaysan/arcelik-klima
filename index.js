var express = require('express');
var socket = require('socket.io');


//App setup
var app = express();
var server = app.listen(8080, function(){
	console.log('listening to request on port 8080');
});

//Static files
app.use(express.static('public'));


//Access Origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Socket setup
var io = socket(server);

io.on('connection', function(socket){

	socket.on('joinRoom', function(data){
		socket.room = data.code;
		socket.join(data.code);
		socket.user = data.user;
	});

	socket.on('changeTemp', function(data){
		io.to(socket.room).emit('changeTemp', data);
	});

	socket.on('turnOnOff', function(data){
		io.to(socket.room).emit('turnOnOff', data);
	});

	socket.on('disconnect', function () {

      
  });

});


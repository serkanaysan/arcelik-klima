var express = require('express');
var socket = require('socket.io');


//App setup
var app = express();
var server = app.listen(8080, function(){
	console.log('listening to request on port 8080');
});

//Static files
app.use(express.static('public'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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


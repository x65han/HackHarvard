//Environment Setup
var express = require('express');
var request = require("request");
var app = express();
// Socket.io Setup
var nickname = [], rooms = [], connections = [];
var http = require('http').Server(app);
var io = require('socket.io')(http);
//FireBase Setup
var rootURL = "https://hackharvard-e5a7d.firebaseio.com";
var firebase = require("firebase");
firebase.initializeApp({databaseURL: rootURL});
var db = firebase.database();
var ref = db.ref("/rooms");
//Heroku Node Setup
app.use(express.static(__dirname + ''));
app.set('views', __dirname + '');
app.set('view engine', 'html');
// socket
io.on('connection', function(socket){
	// Connect to socket
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length); 
    // Disconnect
    socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		nickname.splice(nickname.indexOf(socket.nickname),1);
		rooms.splice(rooms.indexOf(socket.room),1);
		socket.leave(socket.room);
		console.log('Connected: %s sockets connected', connections.length);
    });
	// socket.io Functions
	socket.on('join room', function(roomRequest, response){ 
	    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
	    var roomname = roomRequest[0];
	    var username = roomRequest[1];
		console.log("Handing Join Room Request: " + username + " in " + roomname);
		// roomRequest -> ["E5","Johnson"]
		ref.on("value",function(snapshot){
			var data = snapshot.val();
			console.log(data);
        	delete data.placeholder;
        	for(var room in data) rooms.push(room);
        	// new room? or room exists?
        	if(rooms.indexOf(roomname) == -1){
        		//create new room
        		var user = {};	user[username] = 0;
        		var temp = {};	temp[roomname] = user;
				ref.update(temp);
				console.log(temp);
				console.log("New Room created -> " + roomname);
				console.log(rooms);
        	}
        	//Check username availibility for existing room
        	console.log(data.roomname);
			//Update this Socket's information
			socket.join(roomname);
			socket.room = roomname;
			socket.nickname = username;
			// Emit to the room about new player
			io.to(roomRequest[0]).emit("new player", username);
	    },function(errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    });
	}); 
});
//REST 
app.get('/', function(request, response) {response.sendFile(__dirname + '/index.html');});
app.get('/deleteAllRooms', function (req, res) {
	console.log('Database Cleared & Reset');
	connections = nickname = rooms = []; 
	ref.set({
		placeholder:'Johnson Han'
	});
	res.status(200).send('Delete All Rooms Request Sent');
}); 

// Ultility Functions 

//Port Settings
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

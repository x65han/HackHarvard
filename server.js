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
	socket.isRegistered = false;
	console.log('Connected: %s sockets connected', connections.length);
    // Disconnect
    socket.on('disconnect', function(data){
    	if(socket.isRegistered == true)	ref.child(socket.room).child(socket.nickname).set(null);
		connections.splice(connections.indexOf(socket), 1);
		nickname.splice(nickname.indexOf(socket.nickname),1);
		rooms.splice(rooms.indexOf(socket.room),1);
		getAndUpdatePlayer(socket.room);
		console.log('Connected: %s sockets connected', connections.length);
    });
	// socket.io Functions
	socket.on('send data', function(data, response){
		if(socket.nickname == undefined || socket.room == undefined) return false;
		if(data.x == socket.px && data.y == socket.py) return;
		data.username = socket.nickname;
		socket.px = data.x;
		socket.py = data.y;
		io.to(socket.room).emit("receive data", data);
		// console.log("transferring data -> ");
		if(data.score != undefined){
			ref.child(socket.room).child(socket.nickname).set(data.score);
			socket.score = data.score;
		}
		if(data.score != undefined)console.log(data.score);
	});
	socket.on('join room', function(roomRequest, response){
		var virgin = true;
	    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
	    var roomname = roomRequest[0];
	    var username = roomRequest[1];
		console.log(roomname + " <-> " + username);
		console.log("Handing Join Room Request: " + username + " in " + roomname);
		// roomRequest -> ["E5","Johnson"]
		ref.on("value",function(snapshot){
			if(virgin == false) return;
			virgin = false;
			var data = snapshot.val();
        	delete data.placeholder;
        	for(var room in data) rooms.push(room);
        	// new room? or room exists?
    		var user = {};	user[username] = 0;
        	if(rooms.indexOf(roomname) == -1){
        		//create new room
				ref.child(roomname).update(user);
				console.log("New Room created -> " + roomname);
        	}else{
        		//Check username availibility for existing room
        		for(var one in data[roomname]){
	        		if(one.toLowerCase() == username.toLowerCase()){
	        			console.log("Conflict -> " + data[roomname]);
	        			response(false);
	        			return;
	        		}
	        	}
	        	//Add player to Room
	        	ref.child(roomname).update(user);
				console.log("Adding " + username + " -> " + roomname);
        	}
			//Setup this Socket's information
			socket.join(roomname);
			socket.score = 0;
			socket.room = roomname;
			socket.nickname = username;
			socket.isRegistered = true;
			// Get all player information in the room
			getAndUpdatePlayer(roomname);
			response(true);
	    },function(errorObject) {
	        console.log("The read failed: " + errorObject.code);
	    });
	});
	function getAndUpdatePlayer(roomname){
		// Get all player information in the room
		var jsonWriter = {};
		for(var x in connections){
			if(connections[x].room == roomname){
				var temp_name = connections[x].nickname;
				jsonWriter[temp_name] = connections[x].score;
			}
		}
		// Emit to the room about new player
		io.to(roomname).emit("new player", jsonWriter);
	}
});
//REST
app.get('/', function(request, response) {response.sendFile(__dirname + '/index.html');});
app.get('/deleteAllRooms', function (req, res) {
	console.log('Database Cleared & Reset');
	connections = nickname = rooms = [];
	ref.set({placeholder:'Johnson Han'});
	res.status(200).send('Delete All Rooms Request Sent');
	console.log("Deletion complete");
});

// Ultility Functions

//Port Settings
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Tear Down Script
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
	ref.set({placeholder:'Johnson Han'});
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

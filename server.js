//Environment Setup
var express = require('express');
var request = require("request");
var app = express();
// Socket.io Setup
var nickname = [], rooms = [], connections = [];
var http = require('http').Server(app);
var io = require('socket.io')(http);
//FireBase Setup
var rootURL = "https://unisoundpower.firebaseio.com";
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
	connections.push(socket);
	console.log('Connected: %s sockets connected || %s registered users', connections.length, nickname.length); 
    // Disconnect
    socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		nickname.splice(nickname.indexOf(socket.nickname),1);
		console.log('%s disconnected: %s sockets connected || %s registered users', socket.nickname, connections.length, nickname.length);
    });
	//socket.io Functions
	socket.on('register message', function(msg){
		msg.message = processEmoticon(msg.message);
		var internal_message_wrapper = {};
	    internal_message_wrapper[getTimeStamp()] = {
	        "detail" : msg.message,
	        "sender" : msg.signature
	    };
		console.log('registering: ');console.log(msg);
		ref.child(socket.channel).update(internal_message_wrapper);
		io.to(socket.channel).emit("new message", msg);
	}); 
});
//REST 
app.get('/', function(request, response) {response.sendFile(__dirname + '/index.html');});
app.get('/ping', function (req, res) {
	console.log("System PING!!!!: " + getTimeStamp());
	res.status(200).send(getTimeStamp());
});
//Heroku Constant ping
setInterval(function(){ pingMaster();}, 1740 * 1000);
function pingMaster(){
	console.log("Re-vive Master =-=-=-=-=-");
	request('https://forcefocus.herokuapp.com/ping', function (error, response, body) {
		if(response == undefined) console.log("Nobody replies - embarrasement");
		else console.log(response.toString().length);
	});
}
// Ultility Functions
function getTimeStamp(){
    var d = new Date();
    var year  = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    var day   = d.getDate().toString();
    var hour  = d.getHours().toString();
    var minute= d.getMinutes().toString();
    var second= d.getSeconds().toString();
    var mili  = d.getMilliseconds().toString();
    //Space Filling
    if(month.length == 1) month = '0' + month;
    if(day.length == 1) day = '0' + day;
    if(hour.length == 1) hour = '0' + hour;
    if(minute.length == 1) minute = '0' + minute;
    if(second.length == 1) second = '0' + second;
    if(mili.length == 1) mili = '00' + mili;
    else if(mili.length == 2) mili = '0' + mili;
    // console.log(year);console.log(month);console.log(day);console.log(hour);console.log(minute);console.log(second);console.log(mili);
    return year + month + day + hour + minute + second + mili;
}

//Port Settings
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

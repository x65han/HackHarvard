function establishConnection(){
    console.log("Establishing Connection with Server");
    socket = io.connect(""); 
    joinRoom("E7","Johnson");
    // socket.on('distribute channel message', function(data){  });
}
function joinRoom(roomname, username){
    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
    console.log(username + " <joining> " + roomname);
    console.log();
    var temp = [];
    temp.push(roomname);temp.push(username);
    socket.emit('join room', temp, function(response){
        console.log(response);
    });
} 
    

function establishConnection(){
    console.log("Establishing Connection with Server");
    socket = io.connect(""); 
    joinRoom(roomname, username);
    //Socket Listener
    socket.on('new player', function(data){
        console.log("New player: " + data);
    });
    socket.on('receive data', function(data){
        if(data.username == username) return;
        console.log(data);
    });
}
function joinRoom(roomname, username){
    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
    console.log(username + " <joining> " + roomname);
    console.log();
    var temp = [];
    temp.push(roomname);temp.push(username);
    socket.emit('join room', temp, function(response){
        if(response == true){
            console.log("Start Game");
        }else{
            console.log("Username exists. Please select a different username!");
        }
    });
    share();
} 
function share(){
    var packageData = {
        x : 10,
        y: 20
    }
    socket.emit("send data", packageData);
}
    

function establishConnection(){
    console.log("Establishing Connection with Server");
    socket = io.connect("");
    //Socket Listener
    socket.on('new player', function(data){
        console.log("New player: " + data);
    });
    socket.on('receive data', function(data){
        if(data.username == username) return;
        handleShare(data);
    });
}
function joinRoom(roomname, username){
    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
    console.log(username + " <joining> " + roomname);
    var temp = [];temp.push(roomname);temp.push(username);
    socket.emit('join room', temp, function(response){
        if(response == true){
            startGame();
        }else{
            $('.username').val('');
            $('.roomname').css("width","60%");
            $('.username').css("width","60%");
            // login instruction
    		$('.login-instruction').html("Username exists");
        }
    });
    share();
}
function share(){
    var packageData = {
        x : 612,
        y : 798,
    }
    if(scoreChanged)    packageData.score = score; scoreChanged = false;
    socket.emit("send data", packageData);
}
function handleShare(data){
    console.log("Handling Share");
    console.log(data);
}

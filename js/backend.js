function establishConnection(){
    console.log("Establishing Connection with Server");
    socket = io.connect("");
    //Socket Listener
    socket.on('new player', function(data){
        console.log("New player: ");
        console.log(data);
        var temp = {};
        playerList = {};
        var newPlayerName;
        for(var one in data){
            temp = {
                username: newPlayerName = one,
                score: data[one]
            };
            setScore(newPlayerName,data[one]);
            playerList[newPlayerName] = temp;
            console.log(engine == undefined);
            if(engine != undefined) loadPlayerManager();
        }
        loadScoreBoard();
        orderScoreBoard();
        console.log(playerList);
    });
    socket.on('receive data', function(data){
        if(data.username == username) return;
        handleShare(data);
    });
}
function share(){
    if(playerManager == undefined || playerManager[username] == undefined)return;
    var packageData = {
        x : Math.round(playerManager[username].x),
        y : Math.round(playerManager[username].y)
    }
    if(scoreChanged)packageData.score = score; scoreChanged = false;
    socket.emit("send data", packageData);
}
function handleShare(data){
    // console.log(">> Handling Share "  + data.username);
    // data contains: x, y, username, score
    if(data.score != undefined || data.score != null) setScore(data.username, data.score);
    if(data.x > playerManager[data.username].x){
        playerManager[data.username].cache = "right";
        playerManager[data.username].animations.play('horizontalRun');
        playerManager[data.username].scale.setTo(0.4,0.4);
    }else if(data.x < playerManager[data.username].x){
        playerManager[data.username].cache = "left";
        playerManager[data.username].animations.play('horizontalRun');
        playerManager[data.username].scale.setTo(-0.4,0.4);
    }
    if(data.y > playerManager[data.username].y){
        playerManager[data.username].cache = "down";
        playerManager[data.username].animations.play('verticalRun');
        playerManager[data.username].scale.setTo(0.4, -0.4);
    }else if(data.y < playerManager[data.username].y){
        playerManager[data.username].cache = "up";
        playerManager[data.username].animations.play('verticalRun');
        playerManager[data.username].scale.setTo(0.4, 0.4);
    }
    playerManager[data.username].x = data.x;
    playerManager[data.username].y = data.y;
    // console.log(data.username + " >> " + playerManager[data.username].x + " - " + data.x + " :: "    + playerManager[data.username].y + " - " + data.y);
}
function joinRoom(roomname, username){
    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
    console.log(username + " <joining> " + roomname);
    var temp = [roomname,username];
    socket.emit('join room', temp, function(response){
        if(response == false){
            $('.username').val('');
            // login instruction
    		$('.login-instruction').html("Username exists");
        }else{
			startGame();
		}
    });
}
function isValidCharacter(input){
    input = input.toLowerCase();
    for(var x = 0;x < input.length;x++){
        var ascii = input.charCodeAt(x);
        if(ascii == 32 || (ascii >= 48 && ascii <= 57) || (ascii >= 97 && ascii <= 122)) continue;
        return false;
    }
    return true;
}

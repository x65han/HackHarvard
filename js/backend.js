function establishConnection(){
    socket = io.connect(""); 
    // socket.on('distribute channel message', function(data){
    //     if(environmentMessageReady == false)    applyMessageOnUI(data);
    //     environmentMessageReady = true;
    // });
}

    // socket.emit('register user', username, function(response){
    //     sanityCheckUsername = response;
    //     console.log(response);
    //     if(response == false){
    //         alert("Username Exist & please try a different Username");
    //         clearInterval(sanityCheckTimer);
    //         $('.username-input').val('');
    //     }
    // });
    
    // socket.emit("request channel message",current_user_channel);

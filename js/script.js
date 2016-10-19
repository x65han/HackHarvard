//configuration varible
//gives the state of the game (either local host or server)
var REST = window.location.href.slice(0, window.location.href.length - 1);
var socket, roomname, username, score= 0, scoreChanged = false, userLoggedIn = false;
roomname = "E5";
username = "Johnson Han";
//incase anything doesn't load
window.onload = function(){
	console.log("Loading Done");
	showLoginScreen(true);
    //Connect to socket io (backend)
    establishConnection();
	//key stroke
    document.body.onkeydown = function(e) {
        var ev = e || event;var key = ev.keyCode;
        if(key == 13 && !userLoggedIn) $('.login-button').trigger( "click" );
		if(!userLoggedIn && key != 13)$(".login-instruction").html('');
    }
};

//Monitor
setInterval(function(){
	if(!userLoggedIn && $('.roomname').val() != "" && $('.username').val() != ""){
		$(".login-button").css("opacity","1");
	}
	if(!userLoggedIn && ($('.roomname').val() == "" || $('.username').val() == "")){
		$(".login-button").css("opacity","0.3");
	}
}, 100);

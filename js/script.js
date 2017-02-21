//configuration varible
//gives the state of the game (either local host or server)
var REST = window.location.href.slice(0, window.location.href.length - 1);
var engine, game, socket, roomname, username, score = 0, scoreChanged = false, userLoggedIn = false;
var playerList = {};
//incase anything doesn't load
window.onload = function(){
		console.log("Loading Done");
		// Background Music
		var bgm = new Audio('img/dubstep.mp3');
		bgm.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
		bgm.play();
		showLoginScreen(true);
	    //Connect to socket io (backend)
	    establishConnection();
		//key stroke
	    document.body.onkeydown = function(e) {
	        var ev = e || event;var key = ev.keyCode;
	        if(key == 13 && !userLoggedIn) $('.login-button').trigger( "click" );
			if(!userLoggedIn && key != 13)$(".login-instruction").html('');
	    }
		//Game Pre-boot
		game = new Phaser.Game(1000,500, Phaser.AUTO);
		game.state.add('Boot', Game.Boot);
		game.state.add('Preloader', Game.Preloader);
		game.state.add('MainMenu', Game.MainMenu);
		game.state.add('Level1', Game.Level1);
};

//Monitor
setInterval(function(){
		if(userLoggedIn || $('.roomname').val() == undefined)	return;
		if(!userLoggedIn && $('.roomname').val().length > 1 && $('.username').val().length > 1){
				$(".login-button").css("opacity","1");
		}
		if(!userLoggedIn && ($('.roomname').val().length < 2 || $('.username').val().length < 2)){
				$(".login-button").css("opacity","0.1");
		}
}, 100);

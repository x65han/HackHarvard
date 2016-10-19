function showLoginScreen(decision){
	if(decision == true){
		$('#body').css("background","url('img/background.jpg')");
		$('#body').css("background-size","cover");
		setTimeout(function(){
			$('.login').addClass("login-active");
			$(".login").css("opacity","1");
			setTimeout(function(){
				$("input").css("width","60%");
				$(".login-description").css("opacity","1");
				$(".about").css("opacity","1");
				$(".roomname").focus();
			}, 400);
		}, 150);

		return;
	}
	// Hide login Component
	$('.login').removeClass("login-active");
	$('#body').css("background","");
	$('.login').html('');
	setTimeout(function(){$('.login').addClass("hidden")}, 400);
}
function requestTostartGame(){
	console.log("Requested to Start Game");
	roomname = $('.roomname').val();username = $('.username').val();
	if(roomname.length < 2 || username.length < 2){
		// login instruction
		$('.login-instruction').html("At least 2 characters");
		return;
	}
	joinRoom(roomname, username);
}
function startGame(){
	$("input").css("width","0%");
	$("input").css("border","none");
	userLoggedIn = true;
	setTimeout(function(){showLoginScreen(false);}, 400);
	setTimeout(function(){
		//Game
		var game = new Phaser.Game(1200,500, Phaser.CANVAS,'');
			game.state.add('Boot', Game.Boot);
			game.state.add('Preloader', Game.Preloader);
			game.state.add('MainMenu', Game.MainMenu);
			game.state.add('Level1', Game.Level1)
			game.state.start('Boot');
	}, 600);
}

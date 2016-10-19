function showLoginScreen(decision){
	if(decision == true){
		setTimeout(function(){
			$('.login').addClass("login-active");
			$(".login").css("opacity","1");
			$('#body').css("overflow","hidden");
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
	$('.background').css("background","");
	$('.background').addClass('hidden');
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
	setTimeout(function(){
		showLoginScreen(false);
		game.state.start('Boot');
	}, 400);
}

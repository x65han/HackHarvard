function showLoginScreen(decision){
	if(decision == true){
		setTimeout(function(){
			$('.login').addClass("login-active");
			$(".login").css("opacity","1");
			$('.login-button').addClass("hidden");
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
	$('.login').html('');
	setTimeout(function(){$('.login').addClass("hidden")}, 400);
}
function requestTostartGame(){
	console.log("Requested to Start Game");
	roomname = $('.roomname').val();username = $('.username').val();
	joinRoom(roomname, username);
}
function startGame(){
	$("input").css("width","0%");
	$("input").css("border","none");
	setTimeout(function(){showLoginScreen(false);}, 400);
	userLoggedIn = true;
}

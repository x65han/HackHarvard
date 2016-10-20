function showLoginScreen(decision){
	if(decision == true){
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
function startGame(roomCondition){
	$("input").css("width","0%");
	$("input").css("border","none");
	userLoggedIn = true;
	setTimeout(function(){
			showLoginScreen(false);
			game.state.start('Boot');
	}, 400);
	//Set up score-board
	$('.score').first().addClass("rainbow");
}
//Score board Functions
function addScore(index,number){
	var duration = 500;
	var interval = duration / number;
	var name = "#score" + index;
	$(name).css("transform","scale(1.8,1.8)");
	for(var x = 0; x < number;x++)
		setTimeout(function(){$(name).html(parseInt($(name).html()) + 1);}, interval*x);
		setTimeout(function(){ $(name).css("transform","scale(1,1)");}, interval * number);
}

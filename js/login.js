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
function resetInput(input){
	$('.' + input).val("");
	$('.' + input).focus();
}
function requestTostartGame(){
	console.log("Requested to Start Game");
	roomname = $('.roomname').val().trim();username = $('.username').val().trim();
	// Input Validations
	if(roomname.length < 2 || username.length < 2){
		if(username.length < 2)	resetInput("username");
		if(roomname.length < 2)	resetInput("roomname");
		$('.login-instruction').html("At least 2 characters");return;
	}
	if(roomname.length > 10 || username.length > 10){
		if(username.length > 10)	resetInput("username");
		if(roomname.length > 10)	resetInput("roomname");
		$('.login-instruction').html("Too long");return;
	}
	if(!isValidCharacter(roomname + username)){
		if(!isValidCharacter(username)) resetInput("username");
        if(!isValidCharacter(roomname)) resetInput("roomname");
        $('.login-instruction').html("Invalid Characters");return;
    }
	joinRoom(roomname, username);
}
function startGame(){
	console.log(">> Starting game ......");
	$("input").css("width","0px");
	$("input").css("border","none");
	userLoggedIn = true;
	game.state.start('Boot');
	setTimeout(function(){showLoginScreen(false);}, 400);
}
function loadScoreBoard(){
	console.log(">> Initializing Scoreboard");
	$('.score-board').html("");
	for(var player in playerList){
		var score = playerList[player].score;
		$('.score-board').append("<div class='score' title='" + score + "'id ='score-" + player + "'> " + player + " : " + score + "</div>");
	}
	$('#score-' + username).html("<a style='color:white;'>>> </a>" + $("#score-" + username).html());
	$('.score').first().addClass("rainbow");
}
//Score board Functions
function addScore(userIndex, number){
	var name = "#score-" + userIndex;
	var current = parseInt($(name).attr("title"));
	setScore(userIndex, current + number);
	return current + " "  + userIndex;
}
function setScore(userIndex,target){
	// UI handler
	var name = "#score-" + userIndex, adjustment;
	var number, current = parseInt($(name).attr("title"));
	if(current == target) return;
	else{
		number = Math.abs(target - current);
		if(current < target)adjustment = 1;
		else if(current > target)adjustment = -1;
	}
	$(name).css("transform","scale(1.8,1.8)");
	for(var x = 0; x < number;x++){
		setTimeout(function(){
			var value = parseInt($(name).attr("title")) + adjustment;
			$(name).html(userIndex + " : " + value);
			$(name).attr("title", value);
		}, (500 / number * x));
	}
	setTimeout(function(){$(name).css("transform","scale(1,1)");}, 500);
	//Update and Share
	score = target;
	scoreChanged = true;
	if(username == userIndex)share();
}

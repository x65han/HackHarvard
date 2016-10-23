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
	$('#score-' + username).html("&gt;&gt;" + $("#score-" + username).html());
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
	var current = parseInt($(name).attr("title"));
	$(name).html(userIndex + " : " + target);
	$(name).attr("title", target);
	score = target;
	if(username == userIndex){
		scoreChanged = true;
		playCoinAudio();
		$(name).html("&gt;&gt;" + $(name).html());
	}
	orderScoreBoard();
 }
function orderScoreBoard(){
	console.log("ordering");
	//re-order score-board
	var score_array_raw = document.getElementsByClassName("score");
	var score_array = [];
	for(var x = 0;x < score_array_raw.length;x++)score_array.push(score_array_raw[x]);
	const chances = score_array.length;
	for(var o = 0; o < chances;o++){
		var max = 0,max_index = 0;
		for(var i = 0; i < score_array.length;i++){
			if(parseInt(score_array[i].title) >= max){
				max = parseInt(score_array[i].title);
				max_index = i;
			}
		}
		score_array[max_index].style.transform = "translateY(" + o * 30 + "px)";
		score_array.splice(max_index,1);
	}
}

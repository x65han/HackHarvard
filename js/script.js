//configuration varible
//gives the state of the game (either local host or server)
var REST = window.location.href.slice(0, window.location.href.length - 1);
var socket;
//incase anything doesn't load
window.onload = function(){
	console.log("Loading Done");
    //Connect to socket io (backend)
    establishConnection();
    //Game
    var game = new Phaser.Game(1200,500, Phaser.CANVAS,'');
        game.state.add('Boot', Game.Boot);
        game.state.add('Preloader', Game.Preloader);
        game.state.add('MainMenu', Game.MainMenu);
        game.state.add('Level1', Game.Level1)
        game.state.start('Boot');
};

var Game = {};
Game.Boot = function(game){
    
};

Game.Boot.prototype = {
    init: function(){
        
        //Sets the number of cursors
        //Can be changed
        this.input.maxPointers = 1;
        
        //Game keeps running when player tabs out
        this.state.disableVisibilityChange = true;
    }, 
    
    preload: function(){
        this.load.image('preloaderBar', 'img/preloader.gif');
    },
    
    create:function(){
        this.state.start('Preloader');
    }
}
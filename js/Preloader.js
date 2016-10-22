Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload:function(){

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        //Load all assets
        this.load.tilemap('map','img/tile.csv');
        this.load.image('tileset', 'img/tile.jpg'); 
        this.load.spritesheet('player','img/p1.png',100,100);
        
        
    },
    create:function(){
        this.state.start('Level1');
    }
}

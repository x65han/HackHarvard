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
        this.load.image('tileset', 'img/colors.png'); 
        this.load.image('dot', 'img/coin.jpg');
        this.load.image('dot2', 'img/RainbowCoin.png');
        //Coin layer added
        /*this.load.tilemap('coinMap', 'img/coin_Tile_Layer3.csv');*/
        
        /*game.load.spritesheet('coin', 'img/coin.jpg',10,10);*/
        this.load.spritesheet('player','img/p1.png',46,46);
        
        /*this.load.image('coin','img/coin.png');*/
        this.load.image('pacPackage', 'img/pacManPackage.png');
        
        
    },
    create:function(){
        this.state.start('Level1');
    }
}

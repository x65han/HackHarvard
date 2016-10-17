var enemy1;
Game.Level1 = function(game){};
var map;
var layer;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var drag;
var button;

Game.Level1.prototype = {
    create: function(game){
        //This sets the background color
        this.stage.backgroundColor = '#3A5963'; 
       /* //This line sets the gravity 
        this.physics.arcade.gravity.y = 1400;*/
        //Sets the foundations of the map
        map = this.add.tilemap('map', 64,64);
        //Adding the image to the image
        map.addTilesetImage('tileset');
        
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0,2);
        
        
        player = this.add.sprite(100,560,'player');
        player.anchor.setTo(0.5,0.5);
        
        this.physics.arcade.enable(player);
        
        //camera follows the player
        this.camera.follow(player);
        
        player.body.collideWorldBounds = true;
        controls = {
          right: this.input.keyboard.addKey(Phaser.Keyboard.D),
          left: this.input.keyboard.addKey(Phaser.Keyboard.A),
          up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        };
        
        button = this.add.button(this.world.centerX -95, this.world.centerY + 200, 'buttons', function(){
            console.log('pressed');
        }, this,2,1,0);
        
        //making the button move with the camera
        button.fixedToCamera = true;
        
       
       
        
    },
    update: function(){
        this.physics.arcade.collide(player,layer);
        
        player.body.velocity.x = 0;
        
        
        if(controls.right.isDown){
            player.animations.play('run');
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
        }
        if(controls.left.isDown){
            player.animations.play('run');
            player.scale.setTo(-1,1);
            player.body.velocity.x -= playerSpeed;
        }
        //If up button is pressed and player is touching the ground and if the timer is 0
        if((controls.up.isDown) && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
            player.body.velocity.y = -900;
            jumpTimer = this.time.now + 800;
            player.animations.play('jump');
        }
        //if the player is not moving at all 
        if (player.body.velocity.x == 0 && player.body.velocity.y ==0){
            player.animations.play('idle');
        }
        
        
        
        
        
    }, 
    
    resetPlayer:function(){
        
        player.reset(100,560);
        
    },
    
    getCoin: function(){
        map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
    }
    
}
//checking if they are overlapping 
function checkOverlap(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

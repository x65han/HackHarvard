Game.Level1 = function(game){};
var enemy1,enemy2,enemy3,enemy4;
var map, layer, player;
var drag, button, cache = "right";
var controls = {};
var playerSpeed = 200;
var coinLayer1, coinLayer2;

Game.Level1.prototype = {
    create: function(game){
        //This sets the background color
        this.stage.backgroundColor = '#120309';
        $("body").css("background-color","#120309");
        setTimeout(function(){$("body").css("padding-top", ((window.innerHeight - $('canvas').height()) / 2) + "px");}, 400);
       /* //This line sets the gravity
        this.physics.arcade.gravity.y = 1400;*/
        //Sets the foundations of the map
        map = this.add.tilemap('map', 10,10);
        //Adding the image to the image
        map.addTilesetImage('tileset');
        //Sets the foundation for the coins
        //for main layer
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0,300);

        //for coin layer
        coinLayer1 = this.add.tilemap('coinMap',10,10);
        coinLayer1.addTilesetImage('coins');
        coinLayer2 = coinLayer1.createLayer(0);
        coinLayer2.resizeWorld();
        //this is suppose to remove the coins
        coinLayer1.setTileIndexCallback(998,this.getCoin,this);



        //sets the location of the player
        player = this.add.sprite(0,250,'player');
        player.animations.add('horizontalRun',[0,2],4,true);
        player.animations.add('verticalRun',[1,2],4,true);
        player.animations.add('horizontal',[0],1,true);
        player.animations.add('vertical',[1],1,true);
		player.animations.add('open',[2],1,true);
        //when the player moves, it doesn't move too much
        player.anchor.setTo(0.5,0.5);
        player.scale.setTo(0.4,0.4);
        this.physics.arcade.enable(player);

        //camera follows the player
        this.camera.follow(player);

        player.body.collideWorldBounds = true;
        controls = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        };

        /*button = this.add.button(this.world.centerX -95, this.world.centerY + 200, 'buttons', function(){
            console.log('pressed');
        }, this,2,1,0);*/

        //making the button move with the camera
        /*button.fixedToCamera = true;*/
    },
    update: function(){
        this.physics.arcade.collide(player,layer);

        if(player.body.speed == 0)console.log(Math.round(player.body.x) + " " + Math.round(player.body.y) + " " + Math.round(player.body.speed) + " " + cache);
        if(controls.right.isDown){
            move("right");
        }
        if(controls.left.isDown){
            move("left");
        }
        if(controls.up.isDown){
            move("up");
        }
        if(controls.down.isDown){
            move("down");
        }
        // When Player is idleAnimation
        idleAnimation();
        // Travel through Dimension
        if(player.body.speed == 0 && (player.body.y <= 252 || player.body.y >= 220)){
            if(player.body.x < 5){
                player.body.x = 980;
                move("left");
            }else if(player.body.x > 980){
                player.body.x = 0;
                move("right");
            }
        }
    },

    getCoin: function(){ coinLayer1.putTile(-1,coinLayer2.getTileX(player.x),coinLayer2.getTileY(player.y));
    }

}

function idleAnimation(){
    //When Player is idle
    if(player.body.speed == 0){
        switch(cache){
            case "up":
                player.animations.play("vertical");
                player.scale.setTo(0.4, 0.4);
                break;
            case "down":
                player.animations.play("vertical");
                player.scale.setTo(0.4, -0.4);
                break;
            case "left":
                player.animations.play("horizontal");
                player.scale.setTo(-0.4,0.4);
                break;
            case "right":
                player.animations.play("horizontal");
                player.scale.setTo(0.4,0.4);
                break;
        }
    }
}
function move(input){
    cache = input = input.toLowerCase();
    switch(input){
        case "up":
            player.animations.play('verticalRun');
            player.scale.setTo(0.4, 0.4);
            player.body.velocity.y = -1 * Math.abs(playerSpeed);
            player.body.velocity.x = 0;
            break;
        case "down":
            player.animations.play('verticalRun');
            player.scale.setTo(0.4, -0.4);
            player.body.velocity.y = Math.abs(playerSpeed);
            player.body.velocity.x = 0;
            break;
        case "left":
            player.animations.play('horizontalRun');
            player.scale.setTo(-0.4,0.4);
            player.body.velocity.x = -1 * Math.abs(playerSpeed);
            player.body.velocity.y = 0;
            break;
        case "right":
            player.animations.play('horizontalRun');
            player.scale.setTo(0.4,0.4);
            player.body.velocity.x = Math.abs(playerSpeed);
            player.body.velocity.y = 0;
            break;
    }
}

//checking if they are overlapping
function checkOverlap(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

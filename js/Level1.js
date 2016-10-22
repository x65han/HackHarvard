Game.Level1 = function(game){};
var enemy1,enemy2,enemy3,enemy4;
var map, layer, player;
var drag, button, cache = "right";
var controls = {};
var playerSpeed = 100;
var coins;
var playerManager = {};

Game.Level1.prototype = {
    create: function(game){
        engine = this;
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
        map.setCollisionBetween(0,15);
        map.setTileIndexCallback(66,this.getCoin, this);
        map.setTileIndexCallback(63,this.getCoin, this);

        loadPlayerManager();

        controls = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        };
    },
    update: function(){
        this.physics.arcade.collide(player,layer);

        if(controls.right.isDown)move("right", username);
        if(controls.left.isDown){
            move("left", username);
        }
        if(controls.up.isDown){
            move("up",username);
        }
        if(controls.down.isDown){
            move("down",username);
        }
        // When Player is idleAnimation
        idleAnimation(username);
        // Travel through Dimension
        travelThroughDimension(username);
    },
    getCoin: function(){
        map.putTile(-1,layer.getTileX(player.x),layer.getTileY(player.y));
    }
}
function loadPlayerManager(){
    for(var one in playerManager)playerManager[one].kill();
    for(var one in playerList){
        var temp = engine.add.sprite(0,250,'player');
        temp.animations.add('horizontalRun',[0,2],8,true);
        temp.animations.add('verticalRun',[1,2],  8,true);
        temp.animations.add('horizontal',[0],     8,true);
        temp.animations.add('vertical',[1],       8,true);
        temp.animations.add('open',[2],           8,true);
        temp.anchor.setTo(0.5,0.5);
        temp.scale.setTo(0.4, 0.4);
        engine.physics.arcade.enable(temp);
        temp.body.collideWorldBounds = true;
        console.log(temp);
        playerManager[one] = temp;
    }
}
function travelThroughDimension(target){
    // Travel through Dimension
    if(playerManager[target].body.y <= 252 || playerManager[target].body.y >= 220){
        if(playerManager[target].body.x < 5){
            playerManager[target].body.x = 980;
            move("left", target);
        }else if(playerManager[target].body.x > 980){
            playerManager[target].body.x = 5;
            move("right", target);
        }
    }
}
function idleAnimation(target){
    //When Player is idle
    if(playerManager[target].body.speed == 0){
        switch(cache){
            case "up":
                playerManager[target].animations.play("vertical");
                playerManager[target].scale.setTo(0.4, 0.4);
                break;
            case "down":
                playerManager[target].animations.play("vertical");
                playerManager[target].scale.setTo(0.4, -0.4);
                break;
            case "left":
                playerManager[target].animations.play("horizontal");
                playerManager[target].scale.setTo(-0.4,0.4);
                break;
            case "right":
                playerManager[target].animations.play("horizontal");
                playerManager[target].scale.setTo(0.4,0.4);
                break;
        }
    }
}
function move(input,target){
    cache = input = input.toLowerCase();
    switch(input){
        case "up":
            playerManager[target].animations.play('verticalRun');
            playerManager[target].scale.setTo(0.4, 0.4);
            playerManager[target].body.velocity.y = -1 * Math.abs(playerSpeed);
            playerManager[target].body.velocity.x = 0;
            break;
        case "down":
            playerManager[target].animations.play('verticalRun');
            playerManager[target].scale.setTo(0.4, -0.4);
            playerManager[target].body.velocity.y = Math.abs(playerSpeed);
            playerManager[target].body.velocity.x = 0;
            break;
        case "left":
            playerManager[username].animations.play('horizontalRun');
            playerManager[username].scale.setTo(-0.4,0.4);
            playerManager[username].body.velocity.x = -1 * Math.abs(playerSpeed);
            playerManager[username].body.velocity.y = 0;
            break;
        case "right":
            playerManager[target].animations.play('horizontalRun');
            playerManager[target].scale.setTo(0.4,0.4);
            playerManager[target].body.velocity.x = Math.abs(playerSpeed);
            playerManager[target].body.velocity.y = 0;
            break;
    }
}
// Earn Point Audio
function playCoinAudio(){
    var coinAudio = new Audio('img/coin.mp3');
    coinAudio.play();
}

//checking if they are overlapping
function checkOverlap(spriteA, spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

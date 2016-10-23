Game.Level1 = function(game){};
var enemy1,enemy2,enemy3,enemy4;
var map, layer, player;
var drag, button, cache = "right";
var controls = {};
var playerSpeed = 100;
var playerManager = {};

Game.Level1.prototype = {
    create: function(game){
        engine = this;
        //This sets the background color
        this.stage.backgroundColor = '#120309';
        this.stage.disableVisibilityChange = true;
        $("body").css("background-color","#120309");
        setTimeout(function(){$("body").css("padding-top", ((window.innerHeight - $('canvas').height()) / 2) + "px");}, 400);
       /* //This line sets the gravity
        this.physics.arcade.gravity.y = 1400;*/
        //Sets the foundations of the map
        map = this.add.tilemap('map', 10,10);
        map.addTilesetImage('tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0,15);

        /*Testing out getting coins------------------*/
        //createFromTiles(tiles, replacements, key, layer, group, properties)
        this.dots = this.add.physicsGroup();
        this.dots2 = this.add.physicsGroup();
        map.createFromTiles(66,-1,'dot',this.layer, this.dots);
        map.createFromTiles(63,-1,'dot2',this.layer,this.dots2);

        //createFromTiles(tiles, replacements, key, layer, group, properties)
        /*map.setTileIndexCallback(66,this.getCoin, this);
        map.setTileIndexCallback(63,this.getCoin, this);*/
        /*--------------------------------------------*/
        loadPlayerManager();

        controls = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        };
    },
    getCoinSmall: function(targett, dot){
        dot.kill();dot.destroy();
        addScore(username, 10);
    },
    getCoinBig: function(targett, dot){
        dot.kill();dot.destroy();
        addScore(username, 20);
    },
    update: function(){
        //Collision with wall
        for(one in playerManager){
            this.physics.arcade.collide(playerManager[one],layer);

        }

        this.physics.arcade.overlap(playerManager[username], this.dots, this.getCoinSmall, null, this);
        this.physics.arcade.overlap(playerManager[username], this.dots2, this.getCoinBig, null, this);

        //User control
        if(controls.right.isDown) move("right", username);
        if(controls.left.isDown)  move("left",  username);
        if(controls.up.isDown)    move("up",    username);
        if(controls.down.isDown)  move("down",  username);

        // When Player is idleAnimation
        for(var one in playerManager)idleAnimation(one);
        // Travel through Dimension
        for(var one in playerManager)travelThroughDimension(one);
    },

}
setInterval(function(){
    if(username == undefined || playerManager[username] == undefined) return;
    if(playerManager[username].body.speed != 0) share();
}, 1);
function loadPlayerManager(){
    for(var one in playerManager)   playerManager[one].kill();
    playerManager = {};
    for(var one in playerList){
        console.log(one);
        var temp = engine.add.sprite(30,30,'player');
        temp.animations.add('horizontalRun',[0,2],8,true);
        temp.animations.add('verticalRun',[1,2],  8,true);
        temp.animations.add('horizontal',[0],     8,true);
        temp.animations.add('vertical',[1],       8,true);
        temp.anchor.setTo(0.5,0.5);
        temp.scale.setTo(0.4, 0.4);
        temp.cache = "right";
        engine.physics.arcade.enable(temp);
        temp.body.collideWorldBounds = true;
        temp.body.velocity.x = 0;
        temp.body.velocity.y = 0;
        playerManager[one] = temp;
    }
}
function travelThroughDimension(target){
    // Travel through Dimension
    if(playerManager[target].y <= 261 && playerManager[target].y >= 229){
        if(playerManager[target].x < 10){
            playerManager[target].x = 980;
            move("left", target);
        }else if(playerManager[target].x > 980){
            playerManager[target].x = 10;
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
    playerManager[target].cache = input.toLowerCase();
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
            playerManager[target].animations.play('horizontalRun');
            playerManager[target].scale.setTo(-0.4,0.4);
            playerManager[target].body.velocity.x = -1 * Math.abs(playerSpeed);
            playerManager[target].body.velocity.y = 0;
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

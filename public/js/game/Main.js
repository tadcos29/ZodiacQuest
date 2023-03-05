class Main {

    preload() {

        this.score=0;
        this.skin=2;
    // skin 1
            this.load.spritesheet('player-walk-1', 'img/game-assets/Dude_Monster_Walk_6.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('player-idle-1', 'img/game-assets/Dude_Monster_Idle_4.png',
            { frameWidth: 32, frameHeight: 32 });
    // skin 2
            this.load.spritesheet('player-walk-2', 'img/game-assets/Pink_Monster_Walk_6.png',
            { frameWidth: 32, frameHeight: 32 });
            this.load.spritesheet('player-idle-2', 'img/game-assets/Pink_Monster_Idle_4.png',
            { frameWidth: 32, frameHeight: 32 });
       
        this.load.image('wallH', 'img/game-assets/wallHorizontal.png');
        this.load.image('wallV', 'img/game-assets/wallVertical.png');
        this.load.image('coin','img/game-assets/coin.png');
        this.load.image('enemy','img/game-assets/enemy.png');
        this.load.image('star', './img/game-assets/star.png');
        // load zodiac tokens

    
    }

    create(data) {

        if (data) {console.log('yes, there is data in main game');
        console.log(data);
        this.skin=data.skin;
        
        }
        // this.events.on('gameover', async () => {
        //     console.log('Game over! Score was '+score);
        //     await fetch('api/gamedata', {method: 'POST',headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({score:this.score, currency:this.currency});
        //         })
        //     console.log('Pushed score event');
        //   });

    //     this.scale.setGameSize(500, 340);
    // this.scale.resize(800, 600);
        this.player=this.physics.add.sprite(250, 170, 'player');
        this.enemies = this.physics.add.group();
       // this.addStars();
        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player-idle-'.concat(this.skin), { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player-walk',
            frames: this.anims.generateFrameNumbers('player-walk-'.concat(this.skin), { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.body.gravity.y=500;
        this.coin = this.physics.add.sprite(60, 130,'coin')
        this.arrow = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.currencyText = this.add.text(16, 54, 'Currency Gained: 0', { fontSize: '32px', fill: '#000' });
        this.score=0;
        this.currency=0;
        this.createWorld();
        this.physics.add.collider(this.player, this.walls);
        this.time.addEvent({
            delay:2000,
            callback:() => this.addEnemy(),
            loop:true,
        });
        this.events.on('gameover', this.gameOver, this);
    }
 
    update() {
    //    this.player.angle++;
       
       // this.physics.collide(this.player, this.walls);
        this.physics.collide(this.enemies, this.walls);
        if (this.physics.overlap(this.player, this.enemies)) {
            this.playerDie();
        }
       // this.physics.add.collider(this.stars, this.walls);
      //  this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.movePlayer();
        if (this.player.y > 500 || this.player.y <0) {
            this.playerDie();
        }
        if (this.physics.overlap(this.player, this.coin)) {
            this.takeCoin();
        }
    }
    
    // methods
    movePlayer() {
        if (this.arrow.left.isDown) {
            this.player.setVelocityX(-160);
           // this.player.angle--;
           this.player.flipX=true;
           this.player.anims.play('player-walk', true);
        }

        else if (this.arrow.right.isDown) {
            this.player.setVelocityX(160);
            // this.player.angle++;
            this.player.flipX=false;
            this.player.anims.play('player-walk', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('player-idle', true);
        }

      //  else {this.player.setVelocityY();}
        
        if (this.arrow.up.isDown) {
           // this.player.setVelocityY(-160);
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-320);
            }
           // this.player.angle--;
        }

        else if (this.arrow.down.isDown) {
           //this.player.setVelocityY(160);
           // this.player.angle++;
          
        }
       
    }
    
    createWorld() {
        this.walls = this.physics.add.staticGroup();
        this.walls.create(10,170, 'wallV');
        this.walls.create(490,170, 'wallV');

        this.walls.create(50,10, 'wallH');
        this.walls.create(450,10, 'wallH');
        this.walls.create(50,330, 'wallH');
        this.walls.create(450,330, 'wallH');

        
        this.walls.create(0,170, 'wallH');
        this.walls.create(500,170, 'wallH');
        this.walls.create(250,90, 'wallH');
        this.walls.create(250,250, 'wallH');

    } // create world

    async gameOver() {
        {
            console.log('Game over! Score was '+this.score);
            await fetch('api/gamedata', {method: 'POST',headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({score:this.score, currency:this.currency})
                })
            console.log('Pushed score event');
          }

    }
    playerDie() {
        this.events.emit('gameover');
        this.scene.start('intro', {score:this.score})
    }
    takeCoin() {
        this.currency=this.currency+1;
        this.score=this.score+10;
        this.currencyText.setText('Currency Gained: '+this.currency);
        this.scoreText.setText('Score: '+this.score);
        this.updateCoinPosition();
    }
    addEnemy() {
    let enemy = this.enemies.create(250, -10, 'enemy');
    enemy.body.gravity.y=500;
    enemy.body.velocity.x=Phaser.Math.RND.pick([-100,100]);
    enemy.body.bounce.x = 1;

    this.time.addEvent({delay:10000, callback:()=>enemy.destroy()});
    }
    updateCoinPosition() {
        let positions = [
            {x: 140, y:60},
            {x: 360, y:60},
            {x: 60, y:140},
            {x: 440, y:140},
            {x: 130, y:300},
            {x: 370, y:300}
        ]
        positions=positions.filter(coin => coin.x !== this.coin.x);
        let newPosition=Phaser.Math.RND.pick(positions);
        this.coin.setPosition(newPosition.x, newPosition.y);
        // this.coin.type=Phaser.Math.RND.pick()
        // assign zodiacs
    }
    // addStars() {
    //     this.stars = this.physics.add.group({
    //         key: 'star',
    //         repeat: 11,
    //         setXY: { x: 12, y: 0, stepX: 70 }
    //     });
    //     this.stars.children.iterate(function (child) {
    //         child.body.gravity.y=500;
    //         //  Give each star a slightly different bounce
    //         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    //     });

    // }
    // collectStar(star)
    // {
    //     star.disableBody(true, true);

    //     //  Add and update the score
    //     this.score += 10;
    //     this.scoreText.setText('Score: ' + score);

    //     if (this.stars.countActive(true) === 0)
    //     {
    //         //  A new batch of stars to collect
    //         this.stars.children.iterate(function (child) {

    //             child.enableBody(true, child.x, 0, true, true);

    //         });

            // let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            // let bomb = bombs.create(x, 16, 'bomb');
            // bomb.setBounce(1);
            // bomb.setCollideWorldBounds(true);
            // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // bomb.allowGravity = false;

    //     }
    // }
}
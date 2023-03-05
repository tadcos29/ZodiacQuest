const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0},
                debug: false
            }
        },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  const game = new Phaser.Game(config);
  
  let player;
  let cursors;
  let rams;
  let score = 0;
  let scoreText;
  
  function preload() {
    // load images
    this.load.image('player', 'img/game-assets/star.png');
    this.load.image('ram', 'img/game-assets/bomb.png');
  }
  
  function create() {
    // create player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
  
    // create rams
    rams = this.physics.add.group({
      key: 'ram',
      repeat: 10,
      setXY: { y: 12, x: 0, stepY: 70 },
    });
  
    // set up collisions between player and rams
    this.physics.add.collider(player, rams, hitRam, null, this);
  
    // create score text
    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });
  
    // set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();
  }
  
  function update() {
    // move player with arrow keys
    if (cursors.down.isDown) {
      player.setVelocityY(-160);
    } else if (cursors.up.isDown) {
      player.setVelocityY(160);
    } else {
      player.setVelocityY(0);
    }
  
    // move rams towards player
    rams.getChildren().forEach((ram) => {
      ram.setVelocityX(0.5+(ram.body.velocity.x*(Phaser.Math.FloatBetween(1, 1.01))));
    });
  }
  
  function hitRam(player, ram) {
    // stop the game
    this.physics.pause();
  
    // change player color to red to indicate hit
    player.setTint(0xff0000);
  
    // display game over message
    const gameOverText = this.add.text(250, 250, 'Game Over', {
      fontSize: '64px',
      fill: '#000',
    });
  
    // restart the game after 2 seconds
    setTimeout(() => {
      this.scene.restart();
    }, 2000);
  }
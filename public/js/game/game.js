// var config = {
//     type: Phaser.AUTO,
//     width: 600,
//     height: 600,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// let game = new Phaser.Game(config);

// function preload ()
// {
    
// }

// function create ()
// {
// }

// function update ()
// {
// }
// import Phaser from 'phaser';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "parent",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', './img/game-assets/sky.png');
    this.load.image('ground', './img/game-assets/platform.png');
    this.load.image('star', './img/game-assets/star.png');
    this.load.image('bomb', './img/game-assets/bomb.png');
    this.load.spritesheet('dude', 
        './img/game-assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{
    this.add.image(400, 300, 'sky');

    let platforms = this.physics.add.staticGroup();

    

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

  let player = this.physics.add.sprite(100, 450, 'dude');

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1

    
});
player.body.setGravityY(300);
this.physics.add.collider(player, platforms);

cursors = this.input.keyboard.createCursorKeys();

let stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});

this.physics.add.collider(stars, platforms);
this.physics.add.overlap(player, stars, collectStar, null, this);

stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});



}

function update () {
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

}
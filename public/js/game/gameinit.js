


function runGame() {

    let game = new Phaser.Game ( {
        width: 500, height: 340,
        scale: {mode: Phaser.Scale.FIT,
            max: {
                width: 800,
                height: 600
            }},
        backgroundColor: '#3498db',
        physics: {default: 'arcade'},
        parent: "parent"
        }
    );
    game.scene.add('intro', Intro);
    game.scene.add('main', Main);
    game.scene.start('intro',{skin:2,score:20});
}

let newScore = runGame();
console.log(newScore);
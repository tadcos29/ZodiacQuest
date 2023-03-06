async function runGame() {

    let game = new Phaser.Game ( {
        width: 500, height: 340,
        scale: {mode: Phaser.Scale.FIT,
            max: {
                width: 800,
                height: 600,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }},
        backgroundColor: '#3498db',
        physics: {default: 'arcade'},
        parent: "parent"
        }
    );
   
    try {
        const response = await fetch('/api/gamedata/skin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
          
        });
        console.log('skinfetch');
        
        //   initSettings=response.json();
        initSettings=JSON.stringify(response.json());
        console.log(initSettings);
        game.scene.add('intro', Intro);
        game.scene.add('main', Main);
        game.scene.start('intro',initSettings);
            } catch (error) {
        console.error(error)
      }


   
}

let newScore = runGame();
console.log(newScore);
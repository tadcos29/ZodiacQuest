class Intro {

    preload() {
        this.load.image('splash', './img/zodiacsplash.png');

    }

    create(data) {
        this.cameras.main.setBackgroundColor('#0d1333');
        this.bgsplash=this.add.image(400, 200, 'splash');
        this.passedData={};
        this.passedData.oldScore=0;
        console.log('data passed');
       if(data) {
        console.log('data in intro');
        console.log(data);
        this.passedData.oldScore = data.score ? data.score : 0;
        this.passedData.skin = data.skin ? data.skin : 1;
       }
       let startText = 'Press Space to Begin'
        let nameLabel = this.add.text(400,370,'A Dynamic Database Dare', {font: '50px Quantico', fill: '#fff'});
        nameLabel.setOrigin(0.5,0.5);
        let teamLabel = this.add.text(400,440,'by J-Post, Meltee, and TGC', {font: '30px Quantico', fill: '#fff'});
        teamLabel.setOrigin(0.5,0.5);
        let startPrompt = this.add.text(400, 500, startText, {font: '25px Quantico', fill: '#fff'});
        startPrompt.setOrigin(0.5,0.5);
        this.spaceBar = this.input.keyboard.addKey('space');
       

    }

    update() {
        if (this.spaceBar.isDown) {
            this.scene.start('mainplus', this.passedData);
        }

    }

}
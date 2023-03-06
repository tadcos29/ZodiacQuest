class Intro {

    create(data) {
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
        let nameLabel = this.add.text(250,80,'Zodiac Quest', {font: '50px Arial', fill: '#fff'});
        nameLabel.setOrigin(0.5,0.5);
        let startPrompt = this.add.text(250, 260, startText, {font: '25px Arial', fill: '#fff'});
        startPrompt.setOrigin(0.5,0.5);
        this.spaceBar = this.input.keyboard.addKey('space');
       

    }

    update() {
        if (this.spaceBar.isDown) {
            this.scene.start('mainplus', this.passedData);
        }

    }

}
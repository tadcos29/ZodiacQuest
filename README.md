# ZodiacQuest

## Introduction

In second major group project of the full stack bootcamp my team and I took the opportunity to practice building full-stack web applications using the Model-View-Controller architectural paradigm.

While the typical approach to this project centered on user input, we were interested in the collection and analysis of data on user behaviour, and in the principles of social networking and engagement incentives built around a central hook, in this case a simple browser platformer game.

## Table of Contents

- [Installation](#installation-and-deployment)
- [Usage](#usage)
- [Technology](#technology)
- [Credits](#credits)
- [License](#license)

## Installation and Deployment

The application is [deployed](https://zodiacquestfinal.herokuapp.com/) and auto-built on Heroku in an approximation of a CI/CD pipeline.

It may be cloned locally from the github repository, in which case an .env file with database access will have to be provided. It is advisable to run a Sequelize sync in force:true mode once in order to synchronise the models with the empty database.

As always, npm install will provide the dependencies.

## Usage

The prospective user will be presented with login/sign-up options, as per usual. Upon registering, they will be permitted to play the demo arcade game. 

![image](https://user-images.githubusercontent.com/121476474/223216996-fc23e40a-b6e3-47c3-8293-b7085cfaf732.png)

The game is rudimentary, and serves primarily to generate data about user performance and behaviour. It centers around avoiding Zodiac-themed enemies bolting from randomised locations in the ceiling and creating danger on the platforms, while collecting stars to increase score and yellow symbols to gain premium currency. A star shower is certain if the player collects all the stars before they drop into the gutters, otherwise it's a matter of chance whether another occurs.

The user's stats are tracked and they may view those stats on the profile page as well as compare their progess to that of others. Viewing other users' profiles and commenting on them is made possible, and friend request, approval, and rejection functionality is implemented..

![image](https://user-images.githubusercontent.com/121476474/223215599-20722efe-bdc5-4748-b5bf-29a641f192f9.png)

The user may select their favourite of three provided sprite skins and that choice will be noted in the database and retained between sessions.

![image](https://user-images.githubusercontent.com/121476474/223220164-28eadbf1-e9a3-4cdb-b54b-f960e3ab044a.png)

## Technology

This project uses [Express.js](https://expressjs.com/) for connectivity, [mysql2](https://www.npmjs.com/package/mysql2) for node.js access to the MySQL database, and [Sequelize](https://sequelize.org/) as the Object Relational Mapping tool. It also uses [bcrypt](https://www.npmjs.com/package/bcrypt) for credentials encryption, [https://www.chartjs.org/](Chart.js) for data visualisation, [Handlebars](https://handlebarsjs.com/) for rendering the view, and of course Phaser.io for game creation.


## Credits

The project was created by [Melissa Taylor](https://github.com/melissataylor1), [Jacob Postill](https://github.com/jacobpostill), and [Taddeo Costanzo](https://github.com/tadcos29), developers aspirant from Toronto and Montreal.

The authors are indebted to [Richard Davey](twitter.com/photonstorm) of Photonstorm, the company behind Phaser.io for tutorials and many code concepts used in the game. We would also like to thank Thomas Palef for several visual assets, instructional materials, and code examples he has made available, which were a great help in coming to grips with the phaser.io game engine.

The game uses the public domain tileset Space Cave Tileset kindly provided to the public by [Dmitry Mozgin](https://itch.io/profile/m039) and sprites offered under the [Craftpix license](https://craftpix.net/file-licenses/)

## License

This project is licensed under the [MIT License](https://www.mit.edu/~amini/LICENSE.md)

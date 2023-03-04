const router = require('express').Router();
const { User, GameData, Achievement, FriendRequest } = require('../models');
const sequelize = require('../config/connection');
const { Model, DataTypes, QueryTypes } = require('sequelize');
const withAuth = require('../utils/auth');
const { count } = require('../models/User');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

const user = userData.get({ plain: true });
    // Pass serialized data and session flag into template
    res.render('home', { 
      // Let the homepage do with this what it will
      user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    res.render('home', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      include: {model: GameData, model:Achievement },
      attributes: {
        exclude: ['password'],
        // include: [
        //   [sequelize.fn('COUNT', sequelize.col('game_data.id')), 'played_count'],
        // ]
      },
      // group: ['user.id', 'game_data.id']
      
    });
   // const gameData = await GameData.findAll({ where: { user_id: req.session.user_id },})
// console.log(gameData);
let user = userData.get({ plain: true });
// const games = gameData.map((game) => game.get({ plain: true }));
const rawPlayCount = await sequelize.query(`select count(game_data.id) as 'played_count' from user JOIN game_data on game_data.user_id=user.id WHERE user.id=${req.session.user_id} GROUP BY user.id;`);
const rawHS = await sequelize.query(`select achievement.hs as 'hs', achievement.currency as 'currency', achievement.skin as 'skin' from user JOIN achievement on achievement.user_id=user.id WHERE user.id=${req.session.user_id}`);
const rawLeaderBoard = await sequelize.query(`SELECT user.name as 'name', achievement.hs as 'hs' FROM user JOIN achievement on achievement.user_id=user.id ORDER BY achievement.hs DESC;`);
console.log('lb')
let leaderboard=rawLeaderBoard[0];
console.log(leaderboard);
console.log('rawplay');
console.log(rawPlayCount[0][0]);
// patch-up job using serialise queries. It returns a nested array. Might be able to expand this query to retrieve more data.
if (rawPlayCount[0][0]) {
  user = { ...user, ...rawPlayCount[0][0] }
} else {user.played_count=0}


if (rawHS[0][0]) { 
  user = { ...user, ...rawHS[0][0] }
}
// user.hs = rawHS[0][0].hs;
// user.skin=rawHS[0][0].skin;
// user.currency=rawHS[0][0].currency; // deconstruct that once there are more fields

// console.log(games);
console.log(user);
    // Pass serialized data and session flag into template
    res.render('profile', { 
      // Let the profile page do with these variables what it will
      user, leaderboard,
      logged_in: req.session.logged_in 
    });


  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
   //whatever happens when the user tries the login endpoint and is already logged in
   res.redirect('/profile');
  // res.status(200).json('User already logged in');
    return;
  }
   res.render('login');
  //res.status(200).json('Legitimate login attempt');
});

module.exports = router;

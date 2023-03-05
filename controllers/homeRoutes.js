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

router.get('/profile/:id', withAuth, async (req, res) => {
 try {
    const userData = await User.findByPk(req.params.id, {
      include: {model: GameData, model:Achievement },
      attributes: {
        exclude: ['password'],
        // include: [
        //   [sequelize.fn('COUNT', sequelize.col('game_data.id')), 'played_count'],
        // ]
      },
      // group: ['user.id', 'game_data.id']
      
    });
   // const gameData = await GameData.findAll({ where: { user_id: req.params.id },})
// console.log(gameData);

    req.session.state=req.params.id;
let user = userData.get({ plain: true });
absoluteSession = req.session.user_id;
// const games = gameData.map((game) => game.get({ plain: true }));
const rawGameData = await sequelize.query(`select game_data.score as 'scores' from user JOIN game_data on game_data.user_id=user.id WHERE user.id=${req.params.id} ORDER BY game_data.created_at DESC LIMIT 10;`);
const rawPlayCount = await sequelize.query(`select count(game_data.id) as 'played_count' from user JOIN game_data on game_data.user_id=user.id WHERE user.id=${req.params.id} GROUP BY user.id;`);
const rawHS = await sequelize.query(`select achievement.hs as 'hs', achievement.currency as 'currency', achievement.skin as 'skin' from user JOIN achievement on achievement.user_id=user.id WHERE user.id=${req.params.id}`);
const rawLeaderBoard = await sequelize.query(`SELECT user.name as 'name', achievement.hs as 'hs' FROM user JOIN achievement on achievement.user_id=user.id ORDER BY achievement.hs DESC;`);
const rawComments = await sequelize.query(`select comment.id as 'id', rcp.id as 'recipient_id', snd.id as 'sender_id', rcp.name as 'recipient_name', snd.name as 'sender_name', comment.content as 'content', comment.created_at as 'created_at' from user rcp JOIN comment on rcp.id=comment.recipient_id JOIN user snd ON  comment.user_id = snd.id WHERE rcp.id=${req.params.id}  ORDER BY comment.id DESC LIMIT 10;`);
console.log('lb')
let leaderboard=rawLeaderBoard[0];
console.log(leaderboard);
console.log('rawplay');
console.log(rawPlayCount[0][0]);
console.log('rawComment');
console.log(rawComments[0]);
console.log('rawten');
console.log(rawGameData[0]);
// patch-up job using serialise queries. It returns a nested array. Might be able to expand this query to retrieve more data.
let lastTenRecord=[];
if (rawGameData) {
lastTenRecord = rawGameData[0].map(obj => obj.scores)
} else {lastTenRecord=[]}
// patch-up job using serialise queries. It returns a nested array. Might be able to expand this query to retrieve more data.
if (rawPlayCount[0][0]) {
  user = { ...user, ...rawPlayCount[0][0] }
} else {user.played_count=0}

if (rawHS[0][0]) { 
  user = { ...user, ...rawHS[0][0] }
}

if (rawComments[0][0]) { 
  console.log(rawComments[0]);
  comments = rawComments[0];
  for (x=0;x<comments.length;x++) {
    if (comments[x].sender_id == absoluteSession) {
      comments[x].deletable=true;
    }
  }
  console.log('commentsoutput');
  console.log(comments);
} else {comments=[]}

// user.hs = rawHS[0][0].hs;
// user.skin=rawHS[0][0].skin;
// user.currency=rawHS[0][0].currency; // deconstruct that once there are more fields

// console.log(games);
console.log('user');
console.log(user);
    // Pass serialized data and session flag into template
    res.render('friend-profile', { 
      // Let the profile page do with these variables what it will
      user, leaderboard, comments, absoluteSession, lastTenRecord,
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
   
    req.session.state=req.session.user_id;
   // const gameData = await GameData.findAll({ where: { user_id: req.session.user_id },})
// console.log(gameData);
let user = userData.get({ plain: true });
absoluteSession = req.session.user_id;
// const games = gameData.map((game) => game.get({ plain: true }));
const rawGameData = await sequelize.query(`select game_data.score as 'scores' from user JOIN game_data on game_data.user_id=user.id WHERE user.id=${req.session.user_id} ORDER BY game_data.created_at DESC LIMIT 10;`);
const rawPlayCount = await sequelize.query(`select count(game_data.id) as 'played_count' from user JOIN game_data on game_data.user_id=user.id WHERE user.id=${req.session.user_id} GROUP BY user.id;`);
const rawHS = await sequelize.query(`select achievement.hs as 'hs', achievement.currency as 'currency', achievement.skin as 'skin' from user JOIN achievement on achievement.user_id=user.id WHERE user.id=${req.session.user_id}`);
const rawLeaderBoard = await sequelize.query(`SELECT user.name as 'name', achievement.hs as 'hs' FROM user JOIN achievement on achievement.user_id=user.id ORDER BY achievement.hs DESC;`);
const rawComments = await sequelize.query(`select comment.id as 'id', rcp.id as 'recipient_id', snd.id as 'sender_id', rcp.name as 'recipient_name', snd.name as 'sender_name', comment.content as 'content', comment.created_at as 'created_at' from user rcp JOIN comment on rcp.id=comment.recipient_id JOIN user snd ON  comment.user_id = snd.id WHERE rcp.id=${req.session.user_id}  ORDER BY comment.id DESC LIMIT 10;`);
console.log('lb')
let leaderboard=rawLeaderBoard[0];
console.log(leaderboard);
console.log('rawplay');
console.log(rawPlayCount[0][0]);
console.log('rawComment');
console.log(rawComments[0]);
console.log('rawten');
console.log(rawGameData[0]);
// patch-up job using serialise queries. It returns a nested array. Might be able to expand this query to retrieve more data.
let lastTenRecord=[];
if (rawGameData) {
lastTenRecord = rawGameData[0].map(obj => obj.scores);

} else {lastTenRecord=[]}
console.log('tenrecord');
console.log(lastTenRecord);

if (rawPlayCount[0][0]) {
  user = { ...user, ...rawPlayCount[0][0] }
} else {user.played_count=0}

if (rawHS[0][0]) { 
  user = { ...user, ...rawHS[0][0] }
}

if (rawComments[0][0]) { 
  console.log(rawComments[0]);
  comments = rawComments[0];
  for (x=0;x<comments.length;x++) {
    if (comments[x].sender_id == absoluteSession) {
      comments[x].deletable=true;
    }
  }
  console.log('commentsoutput');
  console.log(comments);
} else {comments=[]}

// user.hs = rawHS[0][0].hs;
// user.skin=rawHS[0][0].skin;
// user.currency=rawHS[0][0].currency; // deconstruct that once there are more fields

// console.log(games);
console.log('user');
console.log(user);
    // Pass serialized data and session flag into template
    res.render('profile', { 
      // Let the profile page do with these variables what it will
      user, leaderboard, comments, absoluteSession, lastTenRecord,
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

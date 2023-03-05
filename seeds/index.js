const sequelize = require('../config/connection');
const { User, Achievement, Comment } = require('../models');

const userData = require('./userData.json');
const achievementData = require('./achievementData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
   const seedUsers = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const seedAchieves= await Achievement.bulkCreate(achievementData, {
    individualHooks: true,
    returning: true,
  });
  const seedComments= await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
    process.exit(0);
  };

// A potential seeding with user objects and Projects, bulk and individual. Requires 

seedDatabase();


const User = require('./User');
const GameData = require('./GameData');

User.hasMany(GameData, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

GameData.belongsTo(User, {
  foreignKey: 'user_id'
   });

// Various database relationships go here
module.exports = { User, GameData 
};

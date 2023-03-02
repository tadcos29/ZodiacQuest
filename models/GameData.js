// The standard User object with built-in passwords

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class GameData extends Model {
 }

GameData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    hooks: {
      beforeCreate: async (newGameData) => {
        newGameData.timestamp = DataTypes.NOW;
        return newGameData;
      },
   },
    sequelize,
    timestamps: true,
    // prevent pluralisation
    freezeTableName: true,
    underscored: true,
    modelName: 'game_data',
  }
);

module.exports = GameData;

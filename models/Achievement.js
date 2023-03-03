// The standard User object with built-in passwords

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Achievement extends Model {
 }

Achievement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    currency: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    skin: {
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    hs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
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
    modelName: 'achievement',
  }
);

module.exports = Achievement;

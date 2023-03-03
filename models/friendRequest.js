const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class FriendRequest extends Model {
 }

 FriendRequest.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  senderEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'email'
    }
  },
  receiverEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'email'    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
},
  {
    hooks: {
      beforeCreate: async (newFriendRequest) => {
        newFriendRequest.timestamp = DataTypes.NOW;
        return newFriendRequest;
      },
   },
    sequelize,
    timestamps: true,
    // prevent pluralisation
    freezeTableName: true,
    underscored: true,
    modelName: 'FriendRequest',
  }
);

module.exports = FriendRequest;


const sequelize = require('../dbconfig');
const { DataTypes } = require('sequelize');
const Joi = require("joi");

const UserAddress = sequelize.sequelize.define(
  'user_address',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    latitude: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'user_address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_address_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }
);

exports.UserAddress = UserAddress;
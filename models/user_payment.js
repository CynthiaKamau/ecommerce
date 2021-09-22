const sequelize = require('../dbconfig');
const { DataTypes } = require('sequelize');
const Joi = require("joi");

const UserPayment = sequelize.sequelize.define(
  'user_payment',
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
    payment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment_methods',
        key: 'id'
      }
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_no: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'user_payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_payment_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }
);

exports.UserPayment = UserPayment;
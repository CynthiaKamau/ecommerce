const sequelize = require('../dbconfig');
const { DataTypes, Sequelize } = require('sequelize');
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
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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

function userAddressValidation(user_address) {
  const schema = Joi.object({
    name: Joi.string()
     .max(65)
     .min(3)
     .required(),
    latitude: Joi.number()
     .required(),
    longitude: Joi.number()
     .required(),
    user_id: Joi.number()
     .required()

  }).unknown(true);

  return schema.validate(user_address)
}

exports.UserAddress = UserAddress;
exports.userAddressValidation = userAddressValidation
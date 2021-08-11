const sequelize = require("../dbconfig");
const { DataTypes } = require('sequelize');
const { Role } = require('./roles');
const Joi = require("joi");

const User = sequelize.sequelize.define(
  'users',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "users_email_key"
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_phone_number_key"
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    deleted_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    restored_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    restored_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_phone_number_key",
        unique: true,
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
});

function registrationValidation(user) {
  const schema = Joi.object({
      first_name: Joi.string()
          .min(3)
          .max(20)
          .required(),
      middle_name: Joi.string()
          .min(3)
          .max(20),
      last_name: Joi.string()
          .min(3)
          .max(20)
          .required(),
      phone_number: Joi.string()
          .max(15)
          .min(10)
          .required(),
      email: Joi.string()
          .min(5)
          .max(255)
          .required()
          .email(),
      password: Joi.string()
          .min(6)
          .max(255)
          .required(),
      role_id: Joi.number()
  }).unknown(true);

  return schema.validate(user);
}

function loginValidation(user) {
  const schema = Joi.object({
      phone_number: Joi.string()
          .max(15)
          .min(10)
          .required(),
      password: Joi.string()
          .min(6)
          .max(255)
          .required(),
  }).unknown(true);

  return schema.validate(user);
}

User.belongsTo(Role, {foreignKey : 'role_id'})
// Role.hasMany(User);

exports.User = User;
exports.registrationValidation = registrationValidation
exports.loginValidation = loginValidation;


const sequelize = require('../dbconfig');
const { DataTypes } = require('sequelize');

const Role = sequelize.sequelize.define(
  'roles',
  {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'roles',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "roles_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});

exports.Role = Role;


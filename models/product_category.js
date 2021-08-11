const sequelize = require("../dbconfig");
const { DataTypes } = require('sequelize');
const Joi = require("joi");

const ProductCategory = sequelize.sequelize.define(
  'product_category',
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
  description: {
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
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'product_category',
  schema: 'public',
  timestamps: false,
  indexes: [
    {
      name: "product_category_pkey",
      unique: true,
      fields: [
        { name: "id" },
      ]
    },
  ]
});

function categoryValidation(category) {
  const schema = Joi.object({
    name: Joi.string()
          .max(65)
          .min(3)
          .required(),
    description: Joi.string()
          .max(65)
          .min(3)

  }).unknown(true);

  return schema.validate(category);
}

exports.ProductCategory = ProductCategory;
exports.categoryValidation = categoryValidation;



const sequelize = require("../dbconfig");
const { DataTypes } = require('sequelize');
const { ProductCategory } = require('./product_category');
const Joi = require("joi");

const Product = sequelize.sequelize.define(
  'products', 
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    SKU: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unit_price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    discount_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'id'
      }
    },
    size: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weight: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_category',
        key: 'id'
      }
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_stock',
        key: 'id'
      }
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
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "product_category_id_foreign",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name : "discount_id_foreign",
        using: "BTREE",
        fields: [
          { name: "discount_id" },
        ]
      },
      {
        name : "stock_id_foreign",
        using: "BTREE",
        fields: [
          { name: "stock_id" },
        ]
      }

    ]
  }
  
);

function productValidation(product) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(65)
      .required(),
    SKU: Joi.string()
      .min(3)
      .max(65)
      .required(),
    description: Joi.string()
      .min(3)
      .max(255),
    unit_price : Joi.number(),
    discount_id : Joi.number(),
    size : Joi.string()
      .min(1)
      .max(255),
    color : Joi.string()
      .min(1)
      .max(255),
    weight : Joi.string()
      .min(1)
      .max(255),
    category_id : Joi.number()
      .required(),
    stock_id : Joi.number()
      .required()
  }).unknown(true);

  return schema.validate(product);

}

Product.belongsTo(ProductCategory, {foreignKey : 'category_id'});

exports.Product = Product;
exports.productValidation = productValidation;




const sequelize = require("../dbconfig");
const { DataTypes } = require('sequelize');
const { ProductCategory } = require('./product_category');

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
      allowNull: false,
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
      }
    ]
  }
  
);

Product.belongsTo(ProductCategory, {foreignKey : 'category_id'});

exports.Product = Product;




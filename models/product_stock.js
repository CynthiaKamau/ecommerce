const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_stock', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.BIGINT,
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
    tableName: 'product_stock',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_stock_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

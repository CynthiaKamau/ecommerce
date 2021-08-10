const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    session_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'shopping_session',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    tableName: 'cart_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cart_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

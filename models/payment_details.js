const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    provider: {
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
    tableName: 'payment_details',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payment_details_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
